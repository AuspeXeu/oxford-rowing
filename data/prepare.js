const fs = require('fs')

// Generate new starting order from previous finishing order
const genStart = () => {
  const inFile = './eights_2017.json'
  const outFile = './eights_2018.json'
  const data = require(inFile)

  const curPos = (boat, day) => boat.moves.slice(0,day).reduce((acc, itm) => acc + itm.moves, 0) * -1 + boat.start
  for (let club in data) {
    Object.keys(data[club]).forEach((gender) => {
      data[club][gender] = data[club][gender].map((boat) => {
        boat.start = boat.cur || curPos(boat, 4)
        boat.moves = []
        delete boat['club']
        delete boat['cur']
        delete boat['gender']
        delete boat['number']
        return boat
      })
    })
  }

  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8')
}

// Some moving around
const inFile = './eights_2018.json'
const data = require(inFile)
for (let club in data) {
  data[club].men = data[club].men.map((boat) => {
    if (boat.start > 68)
      boat.start -= 1
    return boat
  })
}
fs.writeFileSync(inFile, JSON.stringify(data, null, 2), 'utf8')

