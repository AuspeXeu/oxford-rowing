const compression = require('compression')
const fs = require('fs')
const https = require('https')
const http = require('http')
const express = require('express')
const conf = require('nconf')
const bodyParser = require('body-parser')
const {v4: uuid} = require('uuid')
const moment = require('moment')
const { celebrate, Joi, errors } = require('celebrate');
const { isDeepStrictEqual } = require('util')

const log = (...args) => console.log(...[moment().format('HH:mm - DD.MM.YY'), ...args])

//Load configuration
conf.file({file: 'cfg.json'})
conf.defaults({
  port: 3019,
  bind: '0.0.0.0',
  auth: [],
  announcement: {text: 'We are live!', date: new Date().getTime()},
  key: false,
  cert: false,
  ca: false
})
//Generate new authorization code if none
if (!conf.get('auth').length) {
  conf.set('auth', [uuid()])
  conf.save()
}

const eventValidation = {
  body: {
    name: Joi.string().valid('torpids', 'eights').required(),
    year: Joi.number().min(Number(moment().format('YYYY'))).required(),
    divs: {
      men: Joi.array().items(Joi.object({size: Joi.number().min(1), time: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/)})),
      women: Joi.array().items(Joi.object({size: Joi.number().min(1), time: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/)}))
    },
    order: Joi.object().pattern(/\w+/, Joi.object({men: Joi.array().items(Joi.object({start: Joi.number().min(1), moves: Joi.array().length(0)})), women: Joi.array().items({start: Joi.number().min(1), moves: Joi.array().length(0)})}))
  }
}

const reporters = new Set()
const dataCache = {}

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
  http.createServer((req, res) => {
    res.writeHead(301, {'Location': `https://${req.headers['host']}${req.url}`})
    res.end()
  }).listen(80)
} else
  server = http.createServer(app)
const wss = require('express-ws')(app, server);

app.use(compression())
//Server static data
app.use('/css', express.static(`${__dirname}/dist/css`))
app.use('/js', express.static(`${__dirname}/dist/js`))
app.use('/blades.png', express.static(`${__dirname}/dist/blades.png`))
app.use('/spoons.png', express.static(`${__dirname}/dist/spoons.png`))
app.use('/ergstudio.png', express.static(`${__dirname}/dist/ergstudio.png`))
app.use('/data', express.static(`${__dirname}/data`))
//Parse JSON of incoming requests
app.use(bodyParser.json())
//Enable CORS
app.use((_, res, next) => {
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
    res.sendStatus(401)
}
//Broadcast to all WebSocket clients
const broadcast = (msg) => {
  const payload = JSON.stringify(msg)
  aWss.clients.forEach((ws) => {
    ws.send(payload, (err) => {
      if (err) {
        log(err)
      }
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
const logEvent = (ev, ip, id) => {
  eventBuffer.push(`${ev},${ip},${id},${new Date().getTime()}`)
  if (eventBuffer.length > 1000)
    flushEventBuffer()
}
app.post('/event', authReq, celebrate(eventValidation), (req, res) => {
  const {name, year, divs, order} = req.body
  const evtFile = `${__dirname}/data/${name}_${year}.json`
  const divFile = `${__dirname}/data/${name}_${year}_divs.json`
  if (fs.existsSync(evtFile)) {
    // Check if any results have been entered, otherwise reject the event update/creation
    const data = JSON.parse(fs.readFileSync(evtFile, 'utf8'))
    if (Object.values(data).flatMap((club) => Object.values(club)).flatMap((itm) => itm).some(({moves}) => moves.length > 0)) {
      return res.status(500).send('cannot overwrite event that contains already moves for some boats')
    }
  }
  fs.writeFileSync(evtFile, JSON.stringify(order, null, 2))
  fs.writeFileSync(divFile, JSON.stringify(divs, null, 2))
  res.sendStatus(200)
})
app.get('/events', (req, res) => {
  fs.readdir(`${__dirname}/data`, (err, files) => {
    const events = files.filter(fname => fname.match(/.*?[0-9]{4}.json/)).map((fname) => {
      const [, name, year] = fname.match(/(.*?)_(.*?).json/)
      return {year: parseInt(year, 10), name: name.charAt(0).toUpperCase() + name.substr(1)}
    })
    res.json(events)
  })
})
//An announcement is made
app.post('/announce', authReq, (req, res) => {
  const announcement = {text: req.body.text.trim(), date: new Date().getTime()}
  conf.set('announcement', announcement)
  conf.save()
  broadcast({type: 'announcement', text: announcement.text, date: announcement.date})
  res.sendStatus(200)
})
//Receive new results and adjust data accordingly
app.post('/bump/:name/:year', authReq, (req, res) => {
  const {name} = req.params
  const year = parseInt(req.params.year, 10)
  const record = req.body

  //if (year !== new Date().getFullYear())
    //return res.sendStatus(400)

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
    const {club, gender, number, moves} = record
    if (!isDeepStrictEqual(data[club][gender][number].moves, moves)) {
      data[club][gender][number].moves = moves
      //Broadcast changes
      broadcast({type: 'update', record: {name, year, ...record}})
      fs.writeFile(`${__dirname}/data/${name}_${year}.json`, JSON.stringify(data, null, 2), 'utf8', () => res.sendStatus(200))
    } else {
      res.sendStatus(200)
    }
  }).catch((err) => res.status(400).json({err: err}))
})
//Endpoint to verify authorization code
app.get('/verify', authReq, (_, res) => res.status(200).send(''))

//Generate a user report
const userReport = () => ({type: 'users', viewers: Math.max(0, aWss.clients.size - reporters.size), reporters: reporters.size})
//Send user report to all WebSocket clients every 30 seconds
setInterval(() => broadcast(userReport()), 30 * 1000)

//Accept new WebSocket connections
app.ws('/live', (ws, req) => {
  const id = uuid()
  const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || ws._socket.remoteAddress).split(',')[0]
  //Log connect event
  logEvent('c', ip, id)
  //Send a user report to the newly connected client
  ws.send(JSON.stringify(userReport()), (err) => {
    if (err)
      log(err)
  })
  //Send the current announcement to the newly connected client
  const announcement = conf.get('announcement')
  ws.send(JSON.stringify({type: 'announcement', text: announcement.text, date: announcement.date}), (err) => {
    if (err)
      log(err)
  })
  //Remove the socket from the client repository
  ws.on('close', () => {
    //Log discconnect event
    logEvent('d', ip, id)
    //Delete from the reporters repository if needed
    if (reporters.has(id))
      reporters.delete(id)
  })
  //Close client connections on error
  ws.on('error', (err) => {
    log(err)
  })
  //Handler for incoming client messages
  ws.on('message', (data) => {
    const msg = JSON.parse(data)
    //A reporter comes online
    if (msg.type === 'reporter' && isAuth(msg.auth)) {
      reporters.add(id)
      broadcast(userReport())
    }
  })
})

//Get websocket for /live endpoint
const aWss = wss.getWss('/live')

// Validation error handling
app.use(errors())
// Serve home
app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

//Finally start listening
server.listen({host: conf.get('bind'),port: conf.get('port')})
