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
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  next()
})

const clients = new Map()

const authReq = (req, res, next) => {
  if (conf.get('auth').indexOf(req.get('authorization')) !== -1)
    next()
  else
    res.status(401).send('')
}

app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
app.post('/bump', authReq, (req, res) => {
  const event = (req.body.event.name === 'Torpids' ? 'torpids' : 'eights')
  const year = parseInt(req.body.event.year, 10)
  const bump = req.body.bump
  const club = bump.boat.club
  const gender = bump.boat.gender
  const number = parseInt(bump.boat.number, 10)
  const day = parseInt(bump.day, 10)
  const moves = parseInt(bump.moves, 10)

  fs.access(`${__dirname}/dist/static/data/${event}_${year}.json`, fs.F_OK, (err) => {
    if (err)
      res.sendStatus(400)
    else {
      const data = require(`${__dirname}/dist/static/data/${event}_${year}.json`)
      if (data[club][gender][number].moves.length >= day)
        data[club][gender][number].moves[day-1] = moves
      else
        data[club][gender][number].moves.push(moves)
      clients.forEach((ws) => ws.send(JSON.stringify(bump)))
      fs.writeFile(`${__dirname}/dist/static/data/${event}_${year}.json`, JSON.stringify(data), 'utf8', () => res.sendStatus(200))
    }
  })
})
app.get('/verify', authReq, (req, res) => res.status(200).send(''))
app.ws('/live', (ws, req) => {
  const id = uuid()
  clients.set(id, ws)
  ws.on('close', () => clients.delete(id))
})

if (!conf.get('auth').length) {
  conf.set('auth', [uuid()])
  conf.save()
}
app.listen(conf.get('port'), conf.get('bind'))
