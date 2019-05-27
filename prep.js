const fs = require('fs')
const axios = require('axios')
const moment = require('moment')
const decode = require('decode-html')
const cheerio = require('cheerio')

const log = (...args) => console.log(...[moment().format('HH:mm - DD.MM.YY'), ...args])

// Only the following two parameters need to be adjusted each year
//const startingOrder = 'http://eodg.atm.ox.ac.uk/user/dudhia/rowing/torpids/t19sta.html'
const startingOrder = 'http://eodg.atm.ox.ac.uk/user/dudhia/rowing/eights/e19sta.html'
const crewlist = 'https://ourcs.co.uk/racing/entries/events/event/198/crew_lists/'
const year = 2019

const isTorpids = () => startingOrder.indexOf('torpids') > -1
const boatsPerDiv = isTorpids() ? 12 : 13
const fbase = `${__dirname}/data/${isTorpids() ? 'torpids' : 'eights'}_${year}`
const table = {
  BAL: {call: ['Balliol']},
  BRC: {call: ['Brasenose']},
  CHB: {call: ['Christ Church']},
  COO: {call: ['Corpus Christi']},
  EXC: {call: ['Exeter']},
  GTM: {call: ['Green Templeton']},
  HEC: {call: ['Hertford']},
  JEO: {call: ['Jesus']},
  KEB: {call: ['Keble']},
  LMH: {call: ['Lady Margaret', 'L.M.H.', 'Lady Margaret Hall']},
  LIN: {call: ['Linacre']},
  LIC: {call: ['Lincoln']},
  MAG: {call: ['Magdalen']},
  MAN: {call: ['Mansfield']},
  MER: {call: ['Merton']},
  NEC: {call: ['New College']},
  ORO: {call: ['Oriel']},
  OSG: {call: ['Osler House']},
  PMB: {call: ['Pembroke']},
  QCO: {call: [`Queen's`]},
  RPC: {call: [`Regent's`, `Regent's Park`]},
  SOM: {call: ['Somerville']},
  SAC: {call: [`Anne's`, `St Anne's`]},
  SAY: {call: [`Antony's`, `St Antony's`]},
  SBH: {call: [`Benet's`, `St Benet's Hall`, `St Benet's`]},
  SCO: {call: [`Catherine's`, `St Catherine's`]},
  SEH: {call: ['Teddy', 'S.E.H.', 'St Edmund Hall']},
  SHI: {call: [`Hilda's`, `St Hilda's`]},
  SHG: {call: [`Hugh's`, `St Hugh's`]},
  SJO: {call: [`John's`, `St John's`]},
  SPC: {call: [`Peter's`, `St Peter's`]},
  TRO: {call: ['Trinity']},
  UCO: {call: ['Univ', 'University']},
  WAD: {call: ['Wadham']},
  WOO: {call: ['Wolfson']},
  WRO: {call: ['Worcester']}
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

axios.get(crewlist)
  .then((response) => {
    const crews = {}
    const $ = cheerio.load(response.data)
    const crewsRaw = {}
    $('div.panel.panel-default').each((idx, eleme) => {
      const crew = decode($('a', eleme).html())
      crewsRaw[crew] = []
      $('tr', eleme).each((i, elem) => {
        crewsRaw[crew].push({pos: $('.text-right', elem).html(), name: decode($('.text-left', elem).html())})
      })
      if (crewsRaw[crew].length !== 10) {
        delete crewsRaw[crew]
      }
    })
    Object.keys(crewsRaw).forEach((clubRaw) => {
      const [_, needle, gender, number] = clubRaw.match(/(.*?)\s*([M|W])([0-9]*)$/)
      const club = Object.keys(table).find((key) => table[key].call.indexOf(needle) !== -1)
      if (!club) {
        log(clubRaw)
      }
      if (!crews[club]) {
        crews[club] = {men: {}, women: {}}
      }
      crews[club][gender === 'M' ? 'men' : 'women'][number] = crewsRaw[clubRaw]
    })
    fs.writeFileSync(`${fbase}_crews.json`, JSON.stringify(crews, null, 2))
  })

axios.get(startingOrder)
  .then((response) => {
    const starting = {}
    const timetable = {men: [], women: []}
    const divs = response.data.match(/<TABLE cellpadding=0>.*?<\/TABLE>/sg).map((div) => {
      const label = div.match(/<TH COLSPAN=2>\s?\*?(.*?)\s?\(([0-9.]+)\)\*?\n/)
      if (label) {
        log(label[1])
        const [, gender] = label[1].match(/(Women|Men)/)
        const [, hrs, mins] = label[2].match(/([0-9]*).([0-9]*)/)
        let [, number] = label[1].match(/.*?Div\s?(.*)/)
        number = romanValue(number)
        const entries = div.match(/<A .*?>.*?<\/A>/g).map(entry => entry.match(/<A .*?>(.*?)<\/A>/)[1])
          .map((entry, idx) => {
            const [, clubRaw, boat] = entry.match(/(.*?)\s?([IV]*)$/)
            const club = Object.keys(table).find((key) => table[key].call.indexOf(clubRaw) !== -1)
            if (!club) {
              log(clubRaw)
            }
            return {club, boat: romanValue(boat.length ? boat : 'I') - 1, start: (idx + (number - 1) * boatsPerDiv + 1)}
          })
        return {gender: gender.toLowerCase(), entries, number, time: `${(hrs === '12' ? hrs : parseInt(hrs, 10) + 12)}:${mins}`}
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
    fs.writeFileSync(`${fbase}_divs.json`, JSON.stringify(timetable, null, 2))
    fs.writeFileSync(`${fbase}.json`, JSON.stringify(starting, null, 2))
  })
