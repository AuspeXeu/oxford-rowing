const fs = require('fs')
const request =  require('request')

const clients = fs.readFileSync('./clients.csv', 'utf8')
const events = clients.split('\n').map((itm) => ({ip: itm[1], timestamp: itm[2], type: itm[0]}))

const ips = events.filter((evt) => evt.type === 'c')

const uqIps = new Set(ips)

const geoLookUp = () => {
  return new Promise ((resolve, reject) => {
    request('https://geo.auspex.eu', (error, response, data) => {
    if (!error && response.statusCode === 200) {
      const body = JSON.parse(data)
      console.log(body)
      resolve({ip: body.ip, country: body.country.names.en, country_code: body.country.iso_code})
    } else {
      console.log(error, response.statusCode)
      reject(error)
    }
    })
  })
}

const promises = Array.from(uqIps).map((ip) => geoLookUp(ip))

Promise.all(promises).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})

