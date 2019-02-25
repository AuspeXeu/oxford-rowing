const fs = require('fs')
const axios = require('axios')
const moment = require('moment')

const log = (...args) => console.log(...[moment().format('HH:mm - DD.MM.YY'), ...args])

// Only the following two parameters need to be adjusted each year
const startingOrder = 'http://eodg.atm.ox.ac.uk/user/dudhia/rowing/torpids/t19sta.html'
const year = 2019

const isTorpids = () => startingOrder.indexOf('torpids') > -1
const boatsPerDiv = isTorpids() ? 12 : 13
const table = {
  BAL: {call: 'Balliol'},
  BRC: {call: 'Brasenose'},
  CHB: {call: 'Christ Church'},
  COO: {call: 'Corpus Christi'},
  EXC: {call: 'Exeter'},
  GTM: {call: 'Green Templeton'},
  HEC: {call: 'Hertford'},
  JEO: {call: 'Jesus'},
  KEB: {call: 'Keble'},
  LMH: {call: 'Lady Margaret', official: 'L.M.H.'},
  LIN: {call: 'Linacre'},
  LIC: {call: 'Lincoln'},
  MAG: {call: 'Magdalen'},
  MAN: {call: 'Mansfield'},
  MER: {call: 'Merton'},
  NEC: {call: 'New College'},
  ORO: {call: 'Oriel'},
  OSG: {call: 'Osler House'},
  PMB: {call: 'Pembroke'},
  QCO: {call: `Queen's`},
  RPC: {call: `Regent's`, official: `Regent's Park`},
  SOM: {call: 'Somerville'},
  SAC: {call: `Anne's`, official: `St Anne's`},
  SAY: {call: `Antony's`, official: `St Antony's`},
  SBH: {call: `Benet's`, official: `St Benet's Hall`},
  SCO: {call: `Catherine's`, official: `St Catherine's`},
  SEH: {call: 'Teddy', official: 'S.E.H.'},
  SHI: {call: `Hilda's`, official: `St Hilda's`},
  SHG: {call: `Hugh's`, official: `St Hugh's`},
  SJO: {call: `John's`, official: `St John's`},
  SPC: {call: `Peter's`, official: `St Peter's`},
  TRO: {call: 'Trinity'},
  UCO: {call: 'Univ', official: 'University'},
  WAD: {call: 'Wadham'},
  WOO: {call: 'Wolfson'},
  WRO: {call: 'Worcester'}
}

const romanValue = s =>
    s.length ? (() => {
        const parse = [].concat(
            ...glyphs.map(g => 0 === s.indexOf(g) ? (
                [dctTrans[g], s.substr(g.length)]
            ) : [])
        );
        return parse[0] + romanValue(parse[1]);
    })() : 0;

const dctTrans = {
    M: 1E3,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
}

const glyphs = Object.keys(dctTrans)

axios.get(startingOrder)
  .then((response) => {
    const starting = {}
    const timetable = {men: [], women: []}
    const divs = response.data.match(/<TABLE cellpadding=0>.*?<\/TABLE>/sg).map((div, divIdx) => {
      const label = div.match(/<TH COLSPAN=2>\s?\*?(.*?)\s?\(([0-9.]+)\)\n/)
      if (label) {
        const [, gender] = label[1].match(/(Women|Men)/)
        const [, hrs, mins] = label[2].match(/([0-9]*).([0-9]*)/)
        const [, number] = label[1].match(/.*?Div\s?(.*)/)
        const entries = div.match(/<A .*?>.*?<\/A>/g).map(entry => entry.match(/<A .*?>(.*?)<\/A>/)[1])
          .map((entry, idx) => {
            const [, clubRaw, boat] = entry.match(/(.*?)\s?([IV]*)$/)
            const club = Object.keys(table).find((key) => table[key].call === clubRaw || table[key].official === clubRaw)
            if (!club) {
              log(clubRaw)
            }
            return {club, boat: romanValue(boat.length ? boat : 'I') - 1, start: (idx + divIdx * boatsPerDiv)}
          })
        return {gender: gender.toLowerCase(), entries, number: romanValue(number), time: `${(hrs === '12' ? hrs : parseInt(hrs, 10) + 12)}:${mins}`}
      } else {
        return false
      }
    }).filter(div => div)
    divs.forEach((div) => {
      timetable[div.gender].push(div.time)
      timetable[div.gender].sort().reverse()
      div.entries.forEach((entry) => {
        starting[entry.club] = starting[entry.club] || {men: [], women: []}
        starting[entry.club][div.gender].push({start: entry.start, moves: []})
        starting[entry.club][div.gender].sort((a, b) => {
          if (a.start < b.start)
            return -1
          if (a.start > b.start)
            return 1
          return 0
        })
      })
    })
    const fbase = `${__dirname}/data/${isTorpids() ? 'torpids' : 'eights'}_${year}`
    fs.writeFileSync(`${fbase}_divs.json`, JSON.stringify(timetable))
    fs.writeFileSync(`${fbase}.json`, JSON.stringify(starting))
  })
