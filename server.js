const compression = require('compression')
const fs = require('fs')
const https = require('https')
const http = require('http')
const express = require('express')
const expressWs = require('express-uws')
const url = require('url')
const conf = require('nconf')
const bodyParser = require('body-parser')
const uuid = require('uuid/v1')
const log = console.log

//Load configuration
conf.file({file: 'cfg.json'})
conf.defaults({
  port: 3019,
  bind: '127.0.0.1',
  auth: [],
  key: false,
  cert: false,
  ca: false
})
//Generate new authorization code if none
if (!conf.get('auth').length) {
  conf.set('auth', [uuid()])
  conf.save()
}

const reporters = new Set()
const dataCache = {}
let announcement = {text: 'We are live!', date: new Date().getTime()}

const app = express()
//Web and WebSocket server setup
let server
if (conf.get('key')) { 
  const options = {
    key: fs.readFileSync(conf.get('key')),
    cert: fs.readFileSync(conf.get('cert')),
    ca: fs.readFileSync(conf.get('ca'))
  }
  server = https.createServer(options, app)
} else
  server = http.createServer(app)
const wss = expressWs(app, server)

app.use(compression())
//Server static data
app.use('/static', express.static(`${__dirname}/dist/static`))
app.use('/data', express.static(`${__dirname}/data`))
//Parse JSON of incoming requests
app.use(bodyParser.json())
//Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  next()
})
//Is the given authorization code valid?
const isAuth = (code) => conf.get('auth').indexOf(code) !== -1
//Is the given request authenticated?
const authReq = (req, res, next) => {
  if (isAuth(req.get('authorization')))
    next()
  else
    res.status(401).send('')
}
//Broadcast to all WebSocket clients
const broadcast = (msg) => {
  aWss.clients.forEach((ws) => {
    ws.send(JSON.stringify(msg), (err) => {
      if (err) log(err)
    })
  })
}

let eventBuffer = []
//Flush event buffer to file
const flushEventBuffer = () => {
  fs.appendFile(`${__dirname}/clients.csv`, eventBuffer.join('\n')+'\n', (err) => {
    if (err)
      log(err)
    else
      eventBuffer = []
  })
}
//Flush events every hour
setInterval(flushEventBuffer, 60 * 60 * 1000)
//Log events to buffer
const logEvent = (ev, ip) => {
  eventBuffer.push(`${ev},${ip},${new Date().getTime()}`)
  if (eventBuffer.length > 1000)
    flushEventBuffer()
}
//Serve home
app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
//Update an entry in the data structure and broadcast changes
const updateEntry = (data, name, year, club, gender, number, day, move) => {
  //Don't accept results that are more than one day in the future
  if (day > data[club][gender][number].moves.length+1)
    return false
  //Make sure the status is interpreted as boolean
  move.status = Boolean(move.status)
  //Find entry to modify
  let entry = data[club][gender][number].moves[day-1]
  if (!entry || move.op === 'set')
    entry = {status: move.status, moves: move.val}
  else
    if (move.op === 'conf')
      entry.status = move.status
    else {
      entry.moves += move.val
      entry.status = move.status
    }
  data[club][gender][number].moves[day-1] = entry
  //Confirm all previous results of this boat
  data[club][gender][number].moves.slice(0, day-1).forEach((move, idx) => {
    move.status = true
    const payload = {type: 'update', name: name,year: year,club: club,gender: gender,number: number,day: idx+1,move: move}
    broadcast(payload)
    data[club][gender][number].moves[idx] = move
  })
  //Broadcast new results
  const payload = {type: 'update', name: name,year: year,club: club,gender: gender,number: number,day: day,move: data[club][gender][number].moves[day-1]}
  broadcast(payload)
  return true
}
//Whats the position of a boat on a given day?
const curPos = (boat, day) => boat.moves.slice(0,day).reduce((acc, itm) => acc + itm.moves, 0) * -1 + boat.start
//Get all boats of gender
const getBoats = (data, gender, day) => {
  let boats = []
  for (let club in data) {
    const ary = data[club][gender].map((boat, idx) => {
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
//An announcement is made
app.post('/announce', authReq, (req, res) => {
  announcement = {text: req.body.text.trim(), date: new Date().getTime()}
  broadcast({type: 'announcement', text: announcement.text, date: announcement.date})
  res.sendStatus(200)
})
//Receive new results and adjust data accordingly
app.post('/bump', authReq, (req, res) => {
  const name = req.body.name.toLowerCase()
  const year = parseInt(req.body.year, 10)
  let bumpBoat = req.body.bumpBoat
  const bumpedBoat = req.body.bumpedBoat
  const rowOvers = req.body.rowOvers
  const day = parseInt(req.body.day, 10)
  const move = {moves: req.body.moves, status: Boolean(req.body.status)}

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
    //Get ground truth from data
    Object.assign(bumpBoat, data[bumpBoat.club][bumpBoat.gender][bumpBoat.number])
    if (!bumpBoat)
      return res.status(400).json({err: 'Boat not found'})
    if (day > bumpBoat.moves.length + 1 && !rowOvers)
      return res.status(400).json({err: 'Day out of bounds'})
    //All bumpBoat(s) rowed over
    if (rowOvers)
      rowOvers.forEach((boat) => updateEntry(data, name, year, boat.club, boat.gender, parseInt(boat.number,10), day, {op: 'set', val: 0}))
    //Manual entry
    else if (!bumpedBoat) {
      const entry = data[bumpBoat.club][bumpBoat.gender][bumpBoat.number].moves[day-1]
      //Change confirmation of entry
      if (entry && Boolean(entry.status) !== move.status)
        updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'conf', status: move.status})
      else {
        bumpBoat.cur = curPos(bumpBoat, day)
        const boats = getBoats(data, bumpBoat.gender, day)
        boats.filter((boat) => {
          if (move.moves < 0 && boat.moves.length >= day)
            return boat.cur > bumpBoat.cur && boat.cur <= bumpBoat.cur + (move.moves * -1)
          else if (move.moves > 0 && boat.moves.length >= day)
            return boat.cur < bumpBoat.cur && boat.cur >= bumpBoat.cur + (move.moves * -1)
          else
            return false
          }).forEach((boat) => updateEntry(data, name, year, boat.club, boat.gender, boat.number, day, {op: 'mod', val: Math.sign(move.moves) * -1, status: false}))
        updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'mod', val: move.moves, status: false})
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
      updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'set', val: Math.abs(bumpedBoat.cur - bumpBoat.cur)})
    } else
      log('No idea what to do with the data!', req.body)
    fs.writeFile(`${__dirname}/data/${name}_${year}.json`, JSON.stringify(data, null, 2), 'utf8', () => res.sendStatus(200))
  }).catch((err) => res.status(400).json({err: err}))
})
//Endpoint to verify authorization code
app.get('/verify', authReq, (req, res) => res.status(200).send(''))

//Generate a user report
const userReport = () => ({type: 'users', viewers: Math.max(0, aWss.clients.length - reporters.size), reporters: reporters.size})
//Send user report to all WebSocket clients every 30 seconds
setInterval(() => broadcast(userReport()), 30 * 1000)

//Accept new WebSocket connections
app.ws('/live', (ws, req) => {
  const id = uuid()
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || ws._socket.remoteAddress).split(',')[0]
  //Log connect event
  logEvent('c', ip)
  //Send a user report to the newly connected client
  ws.send(JSON.stringify(userReport()), (err) => {
    if (err)
      log(err)
  })
  //Send the current announcement to the newly connected client
  ws.send(JSON.stringify({type: 'announcement', text: announcement.text, date: announcement.date}), (err) => {
    if (err)
      log(err)
  })
  //Remove the socket from the client repository
  ws.on('close', () => {
    //Log discconnect event
    logEvent('d', ip)
    //Delete from the reporters repository if needed
    if (reporters.has(id))
      reporters.delete(id)
  })
  //Close client connections on error
  ws.on('error', (err) => {
    log(err)
  })
  //Handler for incoming client messages
  ws.on('message', (msg) => {
    msg = JSON.parse(msg)
    //A reporter comes online
    if (msg.type === 'reporter' && isAuth(msg.auth)) {
      reporters.add(id)
      broadcast(userReport())
    }
  })
})

//Get websocket for /live endpoint
const aWss = wss.getWss('/live')

//Finally start listening
server.listen({host: conf.get('bind'),port: conf.get('port')})
