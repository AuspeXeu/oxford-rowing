/*** Only the following parameters need to be adjusted each event ***/
// This can either be 'torpids' or 'eights'
const event = 'eights'
const year = 2019

// These ids can be obtained from https://ourcs.co.uk/racing/entries/events/
// Example: 'https://ourcs.co.uk/racing/entries/events/event/198/crew_lists/' -> is 198 for the year 2019
const eightsCrews = [
  {id: 198, year: 2019},
  {id: 186, year: 2018},
  {id: 174, year: 2017},
  {id: 162, year: 2016},
  {id: 146, year: 2015},
  {id: 121, year: 2014},
  {id: 108, year: 2013},
  {id: 92, year: 2012},
  {id: 68, year: 2011},
  {id: 57, year: 2010},
  {id: 44, year: 2009},
  {id: 27, year: 2008},
  {id: 5, year: 2007}
].map((data) => ({...data, event: 'eights'}))

const torpidsCrews = [
  {id: 195, year: 2019},
  {id: 184, year: 2018},
  {id: 173, year: 2017},
  {id: 159, year: 2016},
  {id: 133, year: 2015},
  {id: 119, year: 2014},
  {id: 103, year: 2013},
  {id: 89, year: 2012},
  {id: 67, year: 2011},
  {id: 55, year: 2010},
  {id: 40, year: 2009},
  {id: 22, year: 2008},
  {id: 1, year: 2007}
].map((data) => ({...data, event: 'torpids'}))

const crews = eightsCrews.concat(torpidsCrews)

// DO NOT CHANGE ANYTHING BELOW THIS LINE
const fs = require('fs')
const axios = require('axios')
const moment = require('moment')
const cheerio = require('cheerio')

const log = (...args) => console.log(...[moment().format('HH:mm - DD.MM.YY'), ...args])
const isTorpids = () => event.indexOf('torpids') > -1

const startingOrder = `http://eodg.atm.ox.ac.uk/user/dudhia/rowing/${event}/${event.substring(0,1)}${year.toString().substring(2,4)}sta.html`
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

const downloadCrewlist = async (url, dst) => {
  log(`Downloading ${url} to ${dst}`)
  return axios.get(url)
    .then((response) => {
      const crews = {}
      const $ = cheerio.load(response.data)
      const crewsRaw = {}
      $('div.panel.panel-default').each((idx, eleme) => {
        const crew = $('a', eleme).text()
        crewsRaw[crew] = []
        $('tr', eleme).each((i, elem) => {
          crewsRaw[crew].push({pos: $('.text-right', elem).html(), name: $('.text-left', elem).text()})
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
      fs.writeFileSync(dst, JSON.stringify(crews, null, 2))
    })
}

const crewLists = async () => {
  for (const {id, year, event} of crews) {
    const url = `https://ourcs.co.uk/racing/entries/events/event/${id}/crew_lists/`
    const fname = `${__dirname}/data/${event}_${year}_crews.json`
    if (!fs.existsSync(fname)) {
      await downloadCrewlist(url, fname)
    }
  }
}
crewLists()

axios.get(startingOrder)
  .then((response) => {
    const starting = {}
    const timetable = {men: [], women: []}
    const divs = response.data.match(/<TABLE cellpadding=0>.*?<\/TABLE>/sg).map((div) => {
      const label = div.match(/<TH COLSPAN=2>\s?\*?(.*?)\s?\(([0-9.]+)\)\*?\n/)
      if (label) {
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
        return {gender: gender.toLowerCase(), entries, number, time: `${(hrs === '12' || hrs === '11' ? hrs : parseInt(hrs, 10) + 12)}:${mins}`}
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
