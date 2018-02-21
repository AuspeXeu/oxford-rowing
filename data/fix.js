const fs = require('fs')

const fname = './torpids_2017.json'
const data = require(fname)

for (let club in data) {
  data[club].men = data[club].men.map((boat) => {
    boat.moves = boat.moves.map((moves) => ({moves: moves, status: true}))
    return boat
  })
  data[club].women = data[club].women.map((boat) => {
    boat.moves = boat.moves.map((moves) => ({moves: moves, status: true}))
    return boat
  })
}

fs.writeFileSync(fname, JSON.stringify(data), 'utf8')
