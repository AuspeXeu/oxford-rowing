const fs = require('fs')
const http = require('http')
const express = require('express')
const app = express()
const WebSocket = require('ws')
const url = require('url')
const conf = require('nconf')
const bodyParser = require('body-parser')
const uuid = require('uuid/v1')
const log = console.log

conf.file({file: 'cfg.json'})
conf.defaults({
  port: 3019,
  bind: '127.0.0.1',
  auth: []
})
if (!conf.get('auth').length) {
  conf.set('auth', [uuid()])
  conf.save()
}

app.use('/static', express.static(`${__dirname}/dist/static`))
app.use('/data', express.static(`${__dirname}/data`))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  next()
})

const clients = new Map()
const reporters = new Set()
const dataCache = {}

const isAuth = (code) => conf.get('auth').indexOf(code) !== -1
const authReq = (req, res, next) => {
  if (isAuth(req.get('authorization')))
    next()
  else
    res.status(401).send('')
}
const broadcast = (msg) => {
  clients.forEach((ws) => {
    ws.send(JSON.stringify(msg), (err) => {
      if (err)
        log(err)
    })
  })
}

app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
const updateEntry = (data, name, year, club, gender, number, day, moves) => {
  if (day > data[club][gender][number].moves.length+1)
    return false
  if (data[club][gender][number].moves[day-1])
    if (moves.op === 'set')
      data[club][gender][number].moves[day-1] = {status: moves.status, moves: moves.val}
    else {
      data[club][gender][number].moves[day-1].moves += moves.val
      data[club][gender][number].moves[day-1].status = moves.status
    }
  else
    data[club][gender][number].moves.push({status: moves.status, moves: moves.val})
  const payload = {type: 'update', name: name,year: year,club: club,gender: gender,number: number,day: day,move: data[club][gender][number].moves[day-1]}
  broadcast(payload)
  return true
}
const curPos = (boat, day) => boat.moves.slice(0,day).reduce((acc, itm) => acc + itm.moves, 0) * -1 + boat.start
const getBoats = (data, gender, day) => {
  let boats = []
  for (let club in data) {
    let ary = data[club][gender].map((boat, idx) => {
      boat.club = club
      boat.gender = gender
      boat.number = idx
      boat.cur = curPos(boat, day)
      return boat
    })
    boats = boats.concat(ary)
  }
  return boats
}
app.post('/bump', authReq, (req, res) => {
  const name = req.body.name.toLowerCase()
  const year = parseInt(req.body.year, 10)
  const bumpBoat = req.body.bumpBoat
  const bumpedBoat = req.body.bumpedBoat
  const rowOvers = req.body.rowOvers
  const day = parseInt(req.body.day, 10)
  const move = {moves: parseInt(req.body.moves, 10), status: (req.body.status ? req.body.status : false)}

  if (year !== new Date().getFullYear()) {
    res.sendStatus(400)
    return
  }

  let promise
  if (!dataCache[`${name}_${year}`])
    promise = new Promise((resolve, reject) => {
      fs.access(`${__dirname}/data/${name}_${year}.json`, fs.F_OK, (err) => {
        if (err)
          reject(err)
        else {
          dataCache[`${name}_${year}`] = require(`${__dirname}/data/${name}_${year}.json`)
          //Cache data for one day
          setTimeout(() => delete dataCache[`${name}_${year}`], 24 * 60 * 60 * 1000)
          resolve(dataCache[`${name}_${year}`])
        }
      })    
    })
  else
    promise = Promise.resolve(dataCache[`${name}_${year}`])
  promise.then((data) => {
    //All bumpBoat(s) rowed over
    if (rowOvers)
      rowOvers.forEach((boat) => updateEntry(data, name, year, boat.club, boat.gender, parseInt(boat.number,10), day, {op: 'set', val: 0}))
    //Manual entry
    else if (!bumpedBoat) {
      const entry = data[bumpBoat.club][bumpBoat.gender][bumpBoat.number].moves[day-1]
      //Only change status
      if (entry.status !== move.status)
        updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'set', val: move.moves, status: move.status})
      else {
        bumpBoat.cur = curPos(bumpBoat, day)
        const boats = getBoats(data, bumpBoat.gender, day)
        boats.filter((boat) => {
          if (move.moves < 0)
            return boat.cur > bumpBoat.cur && boat.cur <= bumpBoat.cur + (move.moves * -1)
          else if (move.moves > 0)
            return boat.cur < bumpBoat.cur && boat.cur >= bumpBoat.cur + (move.moves * -1)
          else
            return false
          }).forEach((boat) => updateEntry(data, name, year, boat.club, boat.gender, boat.number, day, {op: 'mod', val: Math.sign(move.moves) * -1, status: move.status}))
        updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'mod', val: move.moves, status: move.status})
      }
    }
    //bumpBoat bumps bumpedBoat
    else if (bumpedBoat && name === 'torpids') {
      bumpBoat.cur = curPos(bumpBoat, day)
      bumpedBoat.cur = curPos(bumpedBoat, day)
      const boats = getBoats(data, bumpBoat.gender, day)
      boats.filter((boat) => boat.cur > bumpedBoat.cur && boat.cur <= bumpBoat.cur)
        .forEach((boat) => updateEntry(data, name, year, boat.club, boat.gender, boat.number, day, {op: 'mod', val: 1}))
      updateEntry(data, name, year, bumpedBoat.club, bumpedBoat.gender, bumpedBoat.number, day, {op: 'mod', val: bumpedBoat.cur - bumpBoat.cur})
    } else if (bumpedBoat && name === 'eights') {
      bumpBoat.cur = curPos(bumpBoat, day)
      bumpedBoat.cur = curPos(bumpedBoat, day)
      updateEntry(data, name, year, bumpedBoat.club, bumpedBoat.gender, bumpedBoat.number, day, {op: 'set', val: bumpedBoat.cur - bumpBoat.cur})
      updateEntry(data, name, year, bumpedBoat.club, bumpBoat.gender, bumpedBoat.number, day, {op: 'set', val: Math.abs(bumpedBoat.cur - bumpBoat.cur)})
    } else
      log('No idea what to do with the data!', req.body)
    fs.writeFile(`${__dirname}/data/${name}_${year}.json`, JSON.stringify(data), 'utf8', () => res.sendStatus(200))
  }).catch((err) => res.sendStatus(400))
})
app.get('/verify', authReq, (req, res) => res.status(200).send(''))

const server = http.createServer(app)
const wss = new WebSocket.Server({server})

const updateUsers = () => broadcast({type: 'users', viewers: Math.max(0, clients.size - reporters.size), reporters: reporters.size})
wss.on('connection', (ws) => {
  const id = uuid()
  clients.set(id, ws)
  updateUsers()
  ws.on('close', () => {
    clients.delete(id)
    if (reporters.has(id))
      reporters.delete(id)
    updateUsers()
  })
  ws.on('error', (err) => {
    log(err)
    clients.delete(id)
  })
  ws.on('message', (msg) => {
    msg = JSON.parse(msg)
    if (msg.type === 'reporter' && isAuth(msg.auth)) {
      reporters.add(id)
      updateUsers()
    }
  })
})

server.listen({host: conf.get('bind'),port: conf.get('port'),exclusive: true})
