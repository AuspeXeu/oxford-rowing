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

const shiftBoats = (gender, start, amount = 1) => {
  const inFile = './eights_2018.json'
  const data = require(inFile)
  for (let club in data) {
    data[club][gender] = data[club][gender].map((boat) => {
      if (boat.start >= start)
        boat.start = boat.start + amount
      return boat
    })
  }
  fs.writeFileSync(inFile, JSON.stringify(data, null, 2), 'utf8')
  return data
}

// Remove a boat
const rmBoat = (club, gender, number) => {
  const inFile = './eights_2018.json'
  let data = require(inFile)
  const oldStart = data[club][gender][number-1].start
  data[club][gender].splice(number-1, 1)
  data = shiftBoats(gender, oldStart, -1)
  fs.writeFileSync(inFile, JSON.stringify(data, null, 2), 'utf8')
}

// Insert a boat
const mkBoat = (club, gender, number, start) => {
  shiftBoats(gender, start, 1)
  const inFile = './eights_2018.json'
  const data = require(inFile)
  data[club][gender].splice(number-1, 0, {start: start, moves: []})
  fs.writeFileSync(inFile, JSON.stringify(data, null, 2), 'utf8')
}

shiftBoats('women', 35, -1)

