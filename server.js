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
app.post('/bump', authReq, (req, res) => {
  const name = req.body.name.toLowerCase()
  const year = parseInt(req.body.year, 10)
  const bumpBoat = req.body.bumpBoat
  const bumpedBoat = req.body.bumpedBoat
  const club = bumpBoat.club
  const gender = bumpBoat.gender
  const number = parseInt(bumpBoat.number, 10)
  const day = parseInt(req.body.day, 10)
  const moves = parseInt(req.body.moves, 10)

  fs.access(`${__dirname}/data/${name}_${year}.json`, fs.F_OK, (err) => {
    if (err)
      res.sendStatus(400)
    else {
      const data = require(`${__dirname}/data/${name}_${year}.json`)
      if (!isNaN(data[club][gender][number].moves[day-1]))
        data[club][gender][number].moves[day-1] = moves
      else
        data[club][gender][number].moves.push(moves)
      clients.forEach((ws) => ws.send(JSON.stringify({type: 'update', name: name,year: year,club: club,gender: gender,number: number,day: day,moves: moves})))
      fs.writeFile(`${__dirname}/data/${name}_${year}.json`, JSON.stringify(data), 'utf8', () => res.sendStatus(200))
    }
  })
})
app.get('/verify', authReq, (req, res) => res.status(200).send(''))
app.ws('/live', (ws, req) => {
  const id = uuid()
  clients.set(id, ws)
  ws.on('close', () => {
    if (reporters.has(id)) {
      reporters.delete(id)
      clients.forEach((ws) => ws.send(JSON.stringify({type: 'reporters', number: reporters.size})))
    }
    clients.delete(id)
  })
  ws.on('message', (msg) => {
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
