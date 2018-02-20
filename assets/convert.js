const fs = require('fs')

const inMen = 'torpids_2017_men.csv'
const inWomen = 'torpids_2017_women.csv'
const out = '../data/torpids_2017.json'

const data = {}
const men = fs.readFileSync(`./${inMen}`, 'utf8')
const women = fs.readFileSync(`./${inWomen}`, 'utf8')

const proc = (csv, gender) => {
  csv.split('\n').map((line) => line.replace('\r','').split(',')).forEach((itm, idx) => {
    if (!data[itm[0]])
      data[itm[0]] = {men: [], women:[]}
    data[itm[0]][gender].push({
      start: idx + 1,
      moves: itm.slice(1, itm.length).map((move) => parseInt(move, 10))
    })
  })
}

proc(men, 'men')
proc(women, 'women')
fs.writeFileSync(out, JSON.stringify(data), 'utf8')
