const fs = require('fs')
const express = require('express')
const app = express()
const expressWs = require('express-ws')(app)
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

const isAuth = (code) => conf.get('auth').indexOf(code) !== -1
const authReq = (req, res, next) => {
  if (isAuth(req.get('authorization')))
    next()
  else
    res.status(401).send('')
}

app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
const updateEntry = (data, name, year, club, gender, number, day, moves) => {
  if (!isNaN(data[club][gender][number].moves[day-1]))
    if (moves.op === 'set')
      data[club][gender][number].moves[day-1] = moves.val
    else
      data[club][gender][number].moves[day-1] += moves.val
  else
    data[club][gender][number].moves.push(moves.val)
  clients.forEach((ws) => ws.send(JSON.stringify({type: 'update', name: name,year: year,club: club,gender: gender,number: number,day: day,moves: data[club][gender][number].moves[day-1]})))
}
app.post('/bump', authReq, (req, res) => {
  const name = req.body.name.toLowerCase()
  const year = parseInt(req.body.year, 10)
  const bumpBoat = req.body.bumpBoat
  const bumpedBoat = req.body.bumpedBoat
  const rowOvers = req.body.rowOvers
  const day = parseInt(req.body.day, 10)
  const moves = parseInt(req.body.moves, 10)

  fs.access(`${__dirname}/data/${name}_${year}.json`, fs.F_OK, (err) => {
    if (err || year !== new Date().getFullYear())
      res.sendStatus(400)
    else {
      const data = require(`${__dirname}/data/${name}_${year}.json`)
      //All bumpBoat(s) rowed over
      if (rowOvers)
        rowOvers.forEach((boat) => updateEntry(data, name, year, boat.club, boat.gender, parseInt(boat.number,10), day, {op: 'set', val: 0}))
      //Manual entry
      else if (!bumpedBoat)
        updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'set', val: moves})
      //bumpBoat bumps bumpedBoat
      //TODO - torpids/eights specific logic here
      else if (bumpedBoat) {
        updateEntry(data, name, year, bumpBoat.club, bumpBoat.gender, bumpBoat.number, day, {op: 'mod', val: 1})
        updateEntry(data, name, year, bumpedBoat.club, bumpBoat.gender, bumpedBoat.number, day, {op: 'mod', val: -1})
      } else
        log('No idea what to do with the data!', req.body)
      fs.writeFile(`${__dirname}/data/${name}_${year}.json`, JSON.stringify(data), 'utf8', () => res.sendStatus(200))
    }
  })
})
app.get('/verify', authReq, (req, res) => res.status(200).send(''))
app.ws('/live', (ws, req) => {
  const id = uuid()
  clients.set(id, ws)
  ws.on('close', () => {
    clients.delete(id)
    if (reporters.has(id)) {
      reporters.delete(id)
      clients.forEach((ws) => ws.send(JSON.stringify({type: 'reporters', number: reporters.size})))
    }
  })
  ws.on('error', (err) => {
    log(err)
    clients.delete(id)
  })
  ws.on('message', (msg) => {
    msg = JSON.parse(msg)
    if (msg.type === 'reporter' && isAuth(msg.auth)) {
      reporters.add(id)
      clients.forEach((ws) => ws.send(JSON.stringify({type: 'reporters', number: reporters.size})))
    }
  })
})

if (!conf.get('auth').length) {
  conf.set('auth', [uuid()])
  conf.save()
}
app.listen(conf.get('port'), conf.get('bind'))
