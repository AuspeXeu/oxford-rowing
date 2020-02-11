<template>
<div id="app">
  <v-app>
    <graphics/>
    <v-toolbar fixed app dense>
      <v-toolbar-title>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="noselect hidden-sm-and-down">Live Bumps</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-btn slot="activator" flat icon @click.native="bladesOnly = !bladesOnly">
          <v-img
            src="/blades.png"
            :max-width="30"
          ></v-img>
        </v-btn>
        <span>Blades?</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn slot="activator" flat icon @click.native="spoonsOnly = !spoonsOnly">
          <v-img
            src="/spoons.png"
            :max-width="30"
          ></v-img>
        </v-btn>
        <span>Spoons?</span>
      </v-tooltip>
      <v-flex xs8 md3 sm2>
        <v-autocomplete
          :items="clubs"
          attach
          v-model="clubSelected"
          label="Club"
          item-value="short"
          item-text="name"
          append-icon="search"
          clearable
          ref="searchField"
          dense
          single-line
          class="mt-2 noselect"
        />
      </v-flex>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout row v-resize="onResize">
          <v-flex id="svg-container" xs12 md10 sm10 offset-sm1 offset-md2 offset-lg3 offset-xl4>
            <svg width="100%" :height="(Math.max(rowsMen, rowsWomen) + (verified ? boatsPerDiv : 0)) * 38 * scale / 0.64">
              <g id="containerMen" :transform="`translate(40,15),scale(${scale})`">
                <text x="0" y="35" font-size="25" :transform="`translate(190,-40)`">Men</text>
                <g v-for="div in divsMen" :key="div.number" :transform="`translate(0,${(((boatsPerDiv * div.number)  * (47.5 + 10)) -5)})`">
                  <path :d="`M 0 0 L ${100 + days * 79} 0`" v-if="div.number < divsMen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
                  <text x="0" y="35" font-size="35" :transform="`translate(${55 + days * 90},-260),rotate(-90)`">{{ divName(div) }}</text>
                </g>
                <g v-for="boat in boatsMen" :key="boat.start" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`" :style="`opacity:${verified ? 1.0 : boat.opacity}`">
                  <text x="0" y="35" font-size="25" transform="translate(-40,0)">{{boat.start}}.</text>
                  <g transform="translate(50,0)">
                    <path v-for="line in makeLines(boat)" :d="line.path" :key="line.path" :stroke-dasharray="(line.status ? '' : '3, 5')" @click="selectBoat(boat)" fill="transparent" style="stroke:gray;stroke-width:5;" />
                    <circle v-for="point in makePoints(boat)" @click="selectBoat(boat)" :key="`${point.x}|${point.y}`" :cx="point.x" :cy="point.y" r="5" stroke="gray" stroke-width="3" fill="gray" />
                    <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="retractBoat(boat)" :transform="`translate(${curPoint(boat.moves.map(({moves}) => moves)).x},${curPoint(boat.moves.map(({moves}) => moves)).y})`"></use>
                    <use v-if="boatSelected && verified && boatSelected.gender === 'men' && boatSelected.moves.length < 4 && (!lanesToBoats.men.has(boat.start) || lanesToBoats.men.get(boat.start).moves.length <= boatSelected.moves.length)" @dblclick="moveBoat(boat.start)" xlink:href="#empty" :transform="`translate(${curPoint([0,0,0,0].slice(0, (boatSelected.moves.length + 1))).x},${curPoint([0,0,0,0].slice(0, (boatSelected.moves.length + 1))).y})`"></use>
                  </g>
                  <use v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="confirmBoat(boat)"></use>
                </g>
              </g>
              <g v-if="divsWomen.length > 0" id="containerWomen" :transform="`translate(${offset+70},15),scale(${scale})`">
                <text x="0" y="35" font-size="25" :transform="`translate(180,-40)`">Women</text>
                <g v-for="div in divsWomen" :key="div.number" :transform="`translate(0,${(((boatsPerDiv * div.number)  * (47.5 + 10)) -5)})`">
                  <path :d="`M 0 0 L ${100 + days * 79} 0`" v-if="div.number < divsWomen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
                  <text x="0" y="35" font-size="35" :transform="`translate(${55 + days * 90},-260),rotate(-90)`">{{ divName(div) }}</text>
                </g>
                <g v-for="boat in boatsWomen" :key="boat.start" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`" :style="`opacity:${verified ? 1.0 : boat.opacity}`">
                  <text x="0" y="35" font-size="25" transform="translate(-40,0)">{{boat.start}}.</text>
                  <g transform="translate(50,0)">
                    <path v-for="line in makeLines(boat)" :d="line.path" :key="line.path" :stroke-dasharray="(line.status ? '' : '3, 5')" @click="selectBoat(boat)" fill="transparent" style="stroke:gray;stroke-width:5;" />
                    <circle v-for="point in makePoints(boat)" @click="selectBoat(boat)" :key="`${point.x}|${point.y}`" :cx="point.x" :cy="point.y" r="5" stroke="gray" stroke-width="3" fill="gray" />
                    <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="retractBoat(boat)" :transform="`translate(${curPoint(boat.moves.map(({moves}) => moves)).x},${curPoint(boat.moves.map(({moves}) => moves)).y})`"></use>
                    <use v-if="boatSelected && verified && boatSelected.gender === 'women' && boatSelected.moves.length < 4 && (!lanesToBoats.women.has(boat.start) || lanesToBoats.women.get(boat.start).moves.length <= boatSelected.moves.length)" @dblclick="moveBoat(boat.start)" xlink:href="#empty" :transform="`translate(${curPoint([0,0,0,0].slice(0, (boatSelected.moves.length + 1))).x},${curPoint([0,0,0,0].slice(0, (boatSelected.moves.length + 1))).y})`"></use>
                  </g>
                  <use v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="confirmBoat(boat)"></use>
                </g>
              </g>
            </svg>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog v-model="announceDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="subheading noselect">Make announcement</span>
            <v-spacer></v-spacer>
            <v-btn icon slot="activator" @click.stop="announceDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs11>
                <v-text-field
                  autofocus
                  label="Message"
                  :rules="[(v) => v && Boolean(v.trim().length) || 'An announcement must not be empty']"
                  v-model="announcementDraft"
                  clearable
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn flat icon @click.stop="makeAnnouncement()">
                  <v-icon>send</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div class="text-xs-center">
        <v-dialog
          v-model="crewDialog"
          v-if="boatSelected"
          width="500">
          <v-card>
            <v-card-title>
              <v-flex shrink style="height:25px;width: 35px;">
              <svg style="width:49px;height:49px;background-color:transparent;">
                <g transform="scale(0.5),translate(2,1)">
                  <use v-bind:xlink:href="`#${boatSelected.custom || boatSelected.club}`"></use>
                </g>
              </svg>
              </v-flex>
              <h4>{{ boatSelected.short }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile v-for="entry in crewSelected" :key="entry.pos">
                <v-list-tile-content><b>{{ entry.pos }}</b></v-list-tile-content>
                <v-list-tile-content class="align-end">{{ entry.name }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="crewDialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-content>
    <v-navigation-drawer temporary hide-overlay fixed v-model="drawer" class="text-xs-center" app>
      <v-list class="pa-1">
        <v-flex>
          <v-btn color="primary"  @click.native.stop="announceDialog = !announceDialog" v-if="verified">
            <v-icon>hearing</v-icon> Announce
          </v-btn>
        </v-flex>
        <v-list-tile avatar>
          <v-list-tile-avatar class="text-xs-center">
            <v-tooltip bottom>
              <v-icon slot="activator" v-show="reporters > 0 || viewers > 0" :class="{ live: isLive }">{{(viewers > 1 ? 'people' : 'person')}}</v-icon>
              <span>
                {{`${reporters} reporter${(reporters > 1 ? 's are' : ' is')} online`}}<br>
                {{`${viewers} viewer${(viewers > 1 ? 's are' : ' is')} online`}}
              </span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Reporters: {{reporters}} Viewers: {{viewers}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
      <v-list class="pt-0" dense v-if="announcement">
        <v-list-tile>
          <v-list-tile-action>
            <v-tooltip bottom>
              <v-icon slot="activator">announcement</v-icon>
              <span>{{announcementDate}}</span>
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-tooltip bottom>
              <v-list-tile-title slot="activator">{{announcementText}}</v-list-tile-title>
              <span>{{`${announcementText}`}}</span>
            </v-tooltip>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-flex>
          <v-select
            class="px-4"
            :item-text="({name, year}) => `${name} ${year}`"
            return-object
            v-model="event"
            :items="events"/>
      </v-flex>
    </v-navigation-drawer>
    <v-footer app fixed>
      <img class="noselect pl-1" src="./assets/woo_crest.png" alt="Wolfson" style="width:24px;"/>
      <div class="pl-2 noselect"><a href="http://www.wolfsonrowing.org/" target="_blank" rel="noopener">Wolfson Boat Club</a></div>
      <v-spacer></v-spacer>
      <div class="noselect"><a href="mailto:chrisvaas@gmail.com">Chris Vaas</a></div>
      <v-btn id="btn-github" flat icon href="https://github.com/AuspeXeu/oxford-rowing" target="_blank" rel="noopener" small>
        <v-icon>fa-github</v-icon>
      </v-btn>
      <div class="noselect pr-2">© {{ new Date().getFullYear() }}</div>
    </v-footer>
    <v-snackbar top v-model="feature" :timeout="0">
      {{ feature ? feature.text : '' }}
      <v-btn flat color="pink" @click="dismissFeature(feature)">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      class="noselect"
      :timeout="snack.timeout"
      :color="snack.color"
      :multi-line="snack.multi"
      v-model="snack.visible">
      {{snack.text}}
    </v-snackbar>
    <v-snackbar
      bottom
      class="noselect"
      :timeout="0"
      color="info"
      :value="verified">
      {{ boatSelected ? `Selection: ${boatSelected.short}` : 'Select a boat' }}
    </v-snackbar>
  </v-app>
</div>
</template>

<script>
import Graphics from './Graphics.vue'

Vue.use(Vuetify)
export default {
  components: {
    Graphics
  },
  data() {
    return {
      countDownDate: new Date('February 26, 2020 12:00:00').getTime(),
      announcementDraft: '',
      bladesOnly: false,
      spoonsOnly: false,
      loading: false,
      announcement: '',
      socket: false,
      boatsSelected: [],
      drawer: false,
      scale: 0.35,
      timer: 0,
      startYear: new Date().getFullYear(),
      isLive: false,
      liveTimer: false,
      viewers: 0,
      features: [
        {key: 'localtime', text: 'Race times are displayed in your local time :)'},
        {key: 'crewlist', text: `Click on a boat's crest to see its crew list!`},
        {key: 'crewlisthist', text: 'We now added crew lists for all events back until 2017'},
        {key: 'history', text: 'We added much more historic data as far as 1826!'}
      ],
      feature: null,
      reporters: 0,
      clubSelected: false,
      event: false,
      auth: false,
      snack: {
        multi: false,
        visible: false,
        timeout: 5000,
        color: 'success',
        text: ''
      },
      crewSelected: [],
      boatSelected: null,
      verified: false,
      announceDialog: false,
      boatsHigh: [],
      divs: false,
      crewDialog: false,
      crews: false,
      events: [],
      chartData: {}
    }
  },
  beforeMount() {
    this.auth = this.$route.query.auth
    const socket = new ReconnectingWebSocket(`${window.location.origin.replace('http','ws')}/live`)
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'update') {
        const {club, gender, number, moves, name, year} = message.record
        if (this.event.year !== year || this.event.name.toLowerCase() !== name)
          return
        /*if (this.chartData[club][gender][number].moves[day-1].status !== moves[moves.length-1].status)
          this.notify(`${this.clubToName(club)} ${(gender === 'men' ? 'M' : 'W')}${this.romanize(number + 1)} result ${(move.status ? 'confirmed' : 'withdrawn')}`, 'info')
        else
          this.notify(`${this.clubToName(club)} ${(gender === 'men' ? 'M' : 'W')}${this.romanize(number + 1)} moves ${move.moves}`, 'info')*/
        this.chartData[club][gender][number].moves = moves
      } else if (message.type === 'users') {
        if (this.reporters < message.reporters)
          this.notify(`A reporter is live`, 'info')
        this.reporters = message.reporters
        this.viewers = message.viewers
      } else if (message.type === 'announcement') {
        this.announcementDraft = message.text
        this.announcement = {text: message.text, date: message.date}
        this.notify(message.text, 'info')
      }
    }
    socket.onopen = () => {
      if (this.auth)
        socket.send(JSON.stringify({type: 'reporter', auth: this.auth}))
      this.socket = socket
    }
  },
  mounted() {
    let now = new Date().getTime()
    if (this.countDownDate - now > 0) {
      const countDown = () => {
        this.snack.timeout = 0
        now = new Date().getTime()
        const distance = this.countDownDate - now
        if (distance < 0) {
          this.notify('Start in 0d 0h 0m 0s', 'info')
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          this.notify(`Start in ${days}d ${hours}h ${minutes}m ${seconds}s`, 'info')
        }
      }
      countDown()
      setInterval(countDown, 1000)
    }
    axios.get('/events')
      .then((response) => {
        this.events = response.data.sort((a, b) => {
          if (a.year === b.year) {
            if (a.name === 'Torpids' && b.name === 'Eights') {
              return -1
            } else if (a.name === 'Eights' && b.name === 'Torpids') {
              return 1
            } else {
              return 0
            }
          } else {
            if (a.year > b.year) {
              return 1
            } else if (a.year < b.year) {
              return -1
            } else {
              return 0
            }
          }
        }).reverse()
        this.selectEvent()
      })
  },
  watch: {
    event(nVal) {
      if (nVal) {
        this.$router.replace({...this.$router.currentRoute, path: `/${nVal.name.toLowerCase()}/${nVal.year}`})
      }
    },
    $route() {
      this.selectEvent()
    },
    bladesOnly() {
      if (this.bladesOnly) {
        this.boatsSelected = this.boats.filter((boat) => boat.moves.reduce((acc, move) => acc && move.moves > 0, true) || this.curPos(boat) === 1)
      } else {
        this.boatsSelected = []
      }
    },
    spoonsOnly() {
      if (this.spoonsOnly) {
        this.boatsSelected = this.boats.filter((boat) => boat.moves.reduce((acc, move) => acc && move.moves < 0, true) || this.curPos(boat) === (boat.gender === 'men' ? this.boatsMen.length : this.boatsWomen.length))
      } else {
        this.boatsSelected = []
      }
    },
    clubSelected() {
      if (this.clubSelected) {
        this.boatsSelected = this.boats.filter((boat) => boat.club === this.clubSelected)
      } else {
        this.boatsSelected = []
      }
    },
    reporters() {
      if (this.reporters > 0 && !this.liveTimer)
        this.liveTimer = setInterval(() => this.isLive = !this.isLive, 1000)
      else if (this.reporters === 0 && this.liveTimer) {
        clearInterval(this.liveTimer)
        this.isLive = false
        this.liveTimer = false
      }
    },
    auth() {
      if (this.auth && this.auth.trim().length)
        axios.get('/verify', {headers: {'authorization': this.auth}})
          .then(() => this.verified = true)
          .catch(() => this.verified = false)
    },
    boatsSelected() {
      this.boats.forEach((boat) => this.chartData[boat.club][boat.gender][boat.number].opacity = 1.0)
      this.boatsHigh = []
      if (this.boatsSelected.length) {
        this.boats.forEach((boat) => this.chartData[boat.club][boat.gender][boat.number].opacity = 0.1)
        this.boatsSelected.forEach((boat) => {
          this.chartData[boat.club][boat.gender][boat.number].opacity = 1.0
        })
        this.boatsHigh = [this.boatsHigh, ...this.boatsSelected]
      } else {
        this.boatSelected = null
      }
    }
  },
  created() {
    this.features = this.features.filter(itm => (this.loadStorage('features') || []).indexOf(itm.key) === -1)
    this.nextFeature()
    window.addEventListener('click', this.onClick, {capture: true})
    window.addEventListener('keydown', this.onKeyDown)
  },
  computed: {
    lanesToBoats() {
      const res = {men: new Map(), women: new Map()}
      this.boatsWomen.forEach((boat) => {
        const pos = this.curPos(boat)
        if (!res.women.has(pos) || res.women.get(pos).moves.length < boat.moves.length) {
          res.women.set(pos, boat)
        }
      })
      this.boatsMen.forEach((boat) => {
        const pos = this.curPos(boat)
        if (!res.men.has(pos) || res.men.get(pos).moves.length < boat.moves.length) {
          res.men.set(pos, boat)
        }
      })
      console.log(res.women.get())
      return res
    },
    days() {
      return Math.max(4, ...this.boats.map(({moves}) => moves.length))
    },
    clubs() {
      const clubs = new Set()
      this.boats.forEach((boat) => clubs.add(boat.club))
      return Array.from(clubs.values()).map((short) => ({short: short, name: this.clubToName(short)}))
    },
    announcementText() {
      if (this.announcement && this.announcement.text)
        return this.announcement.text
      else
        return '' 
    },
    announcementDate() {
      if (this.announcement && this.announcement.date)
        return moment(this.announcement.date).format('LTS')
      else
        return ''
    },
    eventDay() {
      return Math.min.apply(null, this.boats.map((boat) => boat.moves.length)) + 1
    },
    offset() {
      return this.scale * 460
    },
    boatsPerDiv() {
      return (this.event && (this.event.name.toLowerCase() === 'torpids' || this.event.year <= 2011) ? 12 : 13)
    },
    boats() {
      let boats = []
      for (const key in this.chartData) {
        const club = this.chartData[key]
        boats = boats.concat(club.men).concat(club.women)
      }
      const compare = (a,b) => {
        if (a.short < b.short)
          return -1
        if (a.short > b.short)
          return 1
        return 0
      }
      boats.sort(compare)
      return boats
    },
    divsMen() {
      if (this.divs) {
        return this.divs.men.map((time, idx) => ({time: time, number: idx + 1}))
      }
      const ary = Array.from({length: Math.ceil(this.rowsMen / this.boatsPerDiv)}, (x,i) => i)
      ary.shift()
      return ary.map((itm, idx) => ({number: idx+1}))
    },
    divsWomen() {
      if (this.divs) {
        return this.divs.women.map((time, idx) => ({time: time, number: idx + 1}))
      }
      const ary = Array.from({length: Math.ceil(this.rowsWomen / this.boatsPerDiv)}, (x,i) => i)
      ary.shift()
      return ary.map((itm, idx) => ({number: idx+1}))
    },
    boatsMen() {
      let boats = []
      for (const key in this.chartData) {
        this.chartData[key].men.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].men)
      }
      return boats.sort((a,b) => this.curPos(a, this.eventDay)-this.curPos(b, this.eventDay))
    },
    boatsWomen() {
      let boats = []
      for (const key in this.chartData) {
        this.chartData[key].women.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].women)
      }
      return boats.sort((a,b) => this.curPos(a, this.eventDay)-this.curPos(b, this.eventDay))
    },
    rowsMen() {
      let rows = 0
      for (const key in this.chartData) {
        rows += this.chartData[key].men.length
      }
      return rows
    },
    rowsWomen() {
      let rows = 0
      for (const key in this.chartData) {
        rows += this.chartData[key].women.length
      }
      return rows
    }
  },
  methods: {
    moveBoat(lane) {
      if (this.verified && this.boatSelected) {
        const delta = this.curPos(this.boatSelected) - lane
        this.boatSelected.moves.push({moves: delta, status: false})
      }
    },
    retractBoat(boat) {
      if (this.verified) {
        boat.moves = boat.moves.slice(0, boat.moves.length-1)
        const {club, gender, number, moves} = boat
        axios.post(`/bump/${this.event.name.toLowerCase()}/${this.event.year}`, {club, gender, number, moves}, {headers: {'authorization': this.auth}})
          .then(() => this.notify('Result retracted', 'success'))
          .catch(() => {
            this.notify('Failed to retract result status', 'error')
          })
      }
    },
    loadStorage(key) {
      return JSON.parse(localStorage.getItem(key))
    },
    saveStorage(key, val) {
      localStorage.setItem(key, JSON.stringify(val))
    },
    selectEvent() {
      if (this.$route.params.event) {
        const candidates = this.events.filter(evt => evt.name.toLowerCase() === this.$route.params.event && (!this.$route.params.year || evt.year === parseInt(this.$route.params.year, 10)))
        this.loadData(candidates.length ? candidates[0] : false)
      } else {
        this.loadData(this.events.length ? this.events[0] : false)
      }
    },
    dismissFeature(feature) {
      this.saveStorage('features', (this.loadStorage('features') || []).concat([feature.key]))
      this.features = this.features.filter(itm => this.loadStorage('features').map(f => f.key).indexOf(itm.key) === -1)
      this.nextFeature()
    },
    nextFeature() {
      if (this.features.length) {
        this.feature = this.features.pop()
      } else {
        this.feature = false
      }
    },
    onClick(ev) {
      let parent = ev.target
      while (parent && ['use','path','button'].indexOf(parent.tagName.toLowerCase()) === -1) {
        parent = parent.parentElement
      }
      if (!parent) {
        this.boatsSelected = []
        this.clubSelected = false
        this.bladesOnly = false
        this.spoonsOnly = false
      }
    },
    onKeyDown(ev) {
      if (ev.keyCode === 70 && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault()
        this.$refs.searchField.focus()
      }
    },
    makeAnnouncement() {
      const txt = this.announcementDraft.trim()
      if (txt.length) {
        axios.post('/announce', {text: txt}, {headers: {'authorization': this.auth}})
          .then(() => {
            this.announceDialog = false
            this.notify('Announcement made', 'success')
          })
          .catch(() => {
            this.notify('Failed to make announcement', 'error')
          })
      }
    },
    onResize() {
      clearTimeout(this.timer)
      this.timer = setTimeout(function() {
        const width = document.getElementById('svg-container').offsetWidth
        this.scale = Math.min(width * 0.63 / 780, 0.63)
      }.bind(this), 150)
    },
    confirmBoat(boat) {
      if (this.verified) {
        if (!boat.moves[boat.moves.length-1].status) {
          boat.moves.forEach((itm) => itm.status = true)
        } else {
          boat.moves[boat.moves.length-1].status = !boat.moves[boat.moves.length-1].status
        }
        const {club, gender, number, moves} = boat
        axios.post(`/bump/${this.event.name.toLowerCase()}/${this.event.year}`, {club, gender, number, moves}, {headers: {'authorization': this.auth}})
          .then(() => this.notify(`Result ${!boat.moves[boat.moves.length-1].status ? 'withdrawn' : 'confirmed'}`, 'success'))
          .catch(() => {
            this.notify('Failed to change bump status', 'error')
          })
      }
    },
    notify(text, type) {
      this.snack.text = text
      this.snack.color = type
      this.snack.multi = type === 'error'
      this.snack.visible = true
    },
    romanize(num) {
      if (!+num)
        return NaN;
      var digits = String(+num).split(''),
        key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
               '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
               '','I','II','III','IV','V','VI','VII','VIII','IX'],
        roman = '',
        i = 3;
      while (i--)
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
      return Array(+digits.join('') + 1).join('M') + roman;
    },
    divName(div) {
      const formatDivTime = (str) => {
        let [, hours, minutes] = str.match(/([0-9]+):([0-9]+)/)
        if (this.eventDay === 4 && this.event && this.event.name.toLowerCase() === 'eights') {
          hours -= 1
        }
        const mom = moment().tz('Europe/London')
        mom.minutes(minutes)
        mom.hours(hours)
        return mom.local().format('HH:mm')
      }
      return `Division ${this.romanize(div.number)}${div.time ? ` - ${formatDivTime(div.time)}` : ''}`
    },
    clubToName(club) {
      const table = {
        BAL: 'Balliol',BRC: 'Brasenose', CHB: 'Christ Church', COO: 'Corpus Christi', EXC: 'Exeter', GTM: 'Green Templeton', HEC: 'Hertford', JEO: 'Jesus', KEB: 'Keble', LMH: 'Lady Margaret', LIN: 'Linacre', LIC: 'Lincoln', MAG: 'Magdalen', MAN: 'Mansfield', MER: 'Merton', NEC: 'New College', ORO: 'Oriel', OSG: 'Osler House', PMB: 'Pembroke', QCO: `Queen's`, RPC: `Regent's`, SOM: 'Somerville', SAC: `Anne's`, SAY: `Antony's`, SBH: `Benet's`, SCO: `Catherine's`, SEH: `Teddy`, SHI: `Hilda's`, SHG: `Hugh's`, SJO: `John's`, SPC: `Peter's`, TRO: 'Trinity', UCO: 'Univ', WAD: 'Wadham', WOO: 'Wolfson', WRO: 'Worcester'
      }
      return table[club]
    },
    loadData(event) {
      if (!event) {
        return
      }
      this.divs = false
      this.chartData = {}
      axios.get(`/data/${event.name.toLowerCase()}_${event.year}.json`)
        .then((response) => {
          for (const club in response.data) {
            for (const gender in response.data[club]) {
              response.data[club][gender] = response.data[club][gender].map((boat, idx) => {
                boat.club = club
                boat.gender = gender
                boat.number = idx
                boat.opacity = 1.0
                boat.short = `${this.clubToName(boat.club)} ${(gender === 'men' ? 'M' : 'W')}${boat.number + 1}`
                return boat
              })
            }
            Vue.set(this.chartData, club, response.data[club])
          }
          this.event = event
        })
      axios.get(`/data/${event.name.toLowerCase()}_${event.year}_divs.json`)
        .then((response) => {
          this.divs = response.data
        })
        .catch(() => this.divs = false)
      axios.get(`/data/${event.name.toLowerCase()}_${event.year}_crews.json`)
        .then((response) => {
          this.crews = response.data
        })
        .catch(() => this.crews = false)
    },
    selectBoat(boat) {
      if (this.crews && !this.verified) {
        this.crewSelected = this.crews[boat.club][boat.gender][boat.number+1]
        this.crewDialog = true
      }
      this.boatSelected = boat
      this.boats.forEach((bt) => this.chartData[bt.club][bt.gender][bt.number].opacity = 1.0)
      this.clubSelected = boat.club
      const idx = this.boatsSelected.indexOf(boat)
      if (idx !== -1) {
        this.boatsHigh = []
        this.boatsSelected = []
      } else {
        this.boatsHigh = [boat]
        this.boatsSelected = [boat]
      }
      if (this.boatsHigh.length) {
        this.boats.forEach((bt) => this.chartData[bt.club][bt.gender][bt.number].opacity = 0.1)
        this.boatsHigh.forEach((bt) => this.chartData[bt.club][bt.gender][bt.number].opacity = 1.0)
      }
    },
    curPos(boat, day) {
      let moves = boat.moves
      if (day) {
        moves = boat.moves.slice(0, day)
      }
      return moves.reduce((acc, itm) => acc + itm.moves, 0) * -1 + boat.start
    },
    curPoint(moves) {
      return {
        x: -5 + 80 * moves.length,
        y: moves.reduce((acc, amount) => acc + amount, 0) * (47.5 + 10) * -1
      }
    },
    makePoints(boat) {
      let offset = 23.75
      return boat.moves.slice(0, boat.moves.length-1).map((move, idx) => {
        offset += move.moves * (47.5 + 10) * -1
        return {
          x: (80 * (idx+1)),
          y: offset
        }
      })
    },
    makeLines(boat) {
      let offset = 23.75
      let line = `M 0 ${offset}`
      const lines = []
      boat.moves.forEach((move, idx) => {
        offset += move.moves * (47.5 + 10) * -1
        line += ` L ${80 * (idx+1)} ${offset}`
        lines.push({path: line, status: move.status})
        line = `M ${80 * (idx+1)} ${offset}`
      })
      return lines
    },
    inc() {
      this.rows += 1
    }
  }
}
</script>

<style>
body {
  background-color: #fafafa;
}
.live {
  color: red !important;
}
#btn-github {
  margin: 0px;
}
.custom-card {
  padding-bottom: 0px;
  padding-top: 0px;
}
.red-font {
  color: red;
}
svg {
  display:block;
  margin:auto;
  background: #fafafa;
}
.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
svg text {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}
</style>
