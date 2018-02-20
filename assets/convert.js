const fs = require('fs')

const inMen = 'eights_2017_men.csv'
const inWomen = 'eights_2017_women.csv'
const out = '../data/eights_2017.json'

const data = {}
const men = fs.readFileSync(`./${inMen}`, 'utf8')
const women = fs.readFileSync(`./${inWomen}`, 'utf8')

const proc = (csv, gender) => {
  csv.split('\n').map((line) => line.replace('\r','').split(',')).forEach((itm, idx) => {
    const club = itm[0].trim()
    if (!data[club])
      data[club] = {men: [], women:[]}
    data[club][gender].push({
      start: idx + 1,
      moves: itm.slice(1, itm.length).map((move) => parseInt(move, 10))
    })
  })
}

proc(men, 'men')
proc(women, 'women')
fs.writeFileSync(out, JSON.stringify(data), 'utf8')
