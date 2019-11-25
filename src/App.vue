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
                  <path d="M 0 0 L 405 0" v-if="div.number < divsMen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
                  <text x="0" y="35" font-size="35" transform="translate(415,-260),rotate(-90)">{{divName(div)}}</text>
                </g>
                <g v-for="boat in boatsMen" :key="boat.start" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`" :style="`opacity:${boat.opacity}`">
                  <text x="0" y="35" font-size="25" transform="translate(-40,0)">{{boat.start}}.</text>
                  <g transform="translate(50,0)">
                    <path v-for="line in makeLines(boat)" :d="line.path" :key="line.path" :stroke-dasharray="(line.status ? '' : '3, 5')" @click="selectBoat(boat)" fill="transparent" style="stroke:gray;stroke-width:5;" />
                    <circle v-for="point in makePoints(boat)" @click="selectBoat(boat)" :key="`${point.x}|${point.y}`" :cx="point.x" :cy="point.y" r="5" stroke="gray" stroke-width="3" fill="gray" />
                    <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="confirmBoat(boat)" :transform="`translate(${curPoint(boat).x},${curPoint(boat).y})`"></use>
                  </g>
                  <use v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified"></use>
                </g>
              </g>
              <g id="containerWomen" :transform="`translate(${offset+70},15),scale(${scale})`">
                <text x="0" y="35" font-size="25" :transform="`translate(180,-40)`">Women</text>
                <g v-for="div in divsWomen" :key="div.number" :transform="`translate(0,${(((boatsPerDiv * div.number)  * (47.5 + 10)) -5)})`">
                  <path d="M 0 0 L 405 0" v-if="div.number < divsWomen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
                  <text x="0" y="35" font-size="35" transform="translate(415,-260),rotate(-90)">{{divName(div)}}</text>
                </g>
                <g v-for="boat in boatsWomen" :key="boat.start" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`" :style="`opacity:${boat.opacity}`">
                  <text x="0" y="35" font-size="25" transform="translate(-40,0)">{{boat.start}}.</text>
                  <g transform="translate(50,0)">
                    <path v-for="line in makeLines(boat)" :d="line.path" :key="line.path" :stroke-dasharray="(line.status ? '' : '3, 5')" @click="selectBoat(boat)" fill="transparent" style="stroke:gray;stroke-width:5;" />
                    <circle v-for="point in makePoints(boat)" @click="selectBoat(boat)" :key="`${point.x}|${point.y}`" :cx="point.x" :cy="point.y" r="5" stroke="gray" stroke-width="3" fill="gray" />
                    <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="confirmBoat(boat)" :transform="`translate(${curPoint(boat).x},${curPoint(boat).y})`"></use>
                  </g>
                  <use v-bind:xlink:href="`#${boat.custom || boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified"></use>
                </g>
              </g>
            </svg>
          </v-flex>
        </v-layout>
      </v-container>
      <v-bottom-sheet v-model="bumpDialog" max-width="500" hide-overlay inset persistent lazy>
        <v-card>
          <v-card-title>
            <span class="headline noselect">Update Bump</span>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-icon slot="activator">{{(!verified ? 'fa-unlock-alt' : 'fa-lock')}}</v-icon>
              <span>{{(!verified ? 'Not authenticated' : 'Authenticated')}}</span>
            </v-tooltip>
          </v-card-title>
          <v-card-text class="custom-card">
            <v-container grid-list-xs>
              <v-layout wrap>
                <v-flex xs2 sm2 md2>
                  <v-select
                    attach
                    label="Day"
                    required
                    v-model="bumpDay"
                    :items="[1,2,3,4]"
                  ></v-select>
                </v-flex>
                <v-flex xs2 sm2 md2>
                  <v-select
                    label="Division"
                    required
                    item-value="number"
                    item-text="number"
                    v-model="bumpDivision"
                    :items="(bumpGender === 'men' ? divsMen.concat({number: 'all'}) : divsWomen.concat({number: 'all'}))"
                  ></v-select>
                </v-flex>
                <v-flex xs3 sm3 md3>
                  <v-select
                    label="Gender"
                    required
                    attach
                    v-model="bumpGender"
                    :items="['men','women']"
                  ></v-select>
                </v-flex>
                <v-flex xs5 sm5 md5>
                  <v-tabs right v-model="bumpTab">
                    <v-tab v-for="n in ['Bump','Manual']" :key="n" value="a">{{ n }}</v-tab>
                  </v-tabs>
                </v-flex>
              </v-layout>
              <v-layout wrap v-show="bumpTab === 0">
                <v-flex xs5 sm5 md5 :md8="bumpAction ==='row over'" :sm8="bumpAction ==='row over'" :xs8="bumpAction ==='row over'">
                  <v-select
                    v-show="bumpAction === 'row over'"
                    label="Boats"
                    item-text="short"
                    return-object
                    v-model="rowOvers"
                    required
                    clearable
                    multiple
                    :items="rowOverBoats"
                  ></v-select>
                  <v-select
                    v-show="bumpAction === 'bumps'"
                    label="Boat"
                    item-text="short"
                    return-object
                    v-model="bumpBoat"
                    required
                    :items="bumpBoats"
                  ></v-select>
                </v-flex>
                <v-flex xs3 sm3 md3 :md4="bumpAction ==='row over'" :sm4="bumpAction ==='row over'" :xs4="bumpAction ==='row over'">
                  <v-select
                    label="Action"
                    required
                    attach
                    v-model="bumpAction"
                    :items="['bumps','row over']"
                  ></v-select>
                </v-flex>
                <v-flex xs4 sm4 md4 style="padding-top:22px;">
                  <span v-show="bumpAction === 'bumps'" class="subheading">
                    {{(bumpedBoat ? bumpedBoat.short : '')}}
                  </span>
                </v-flex>
              </v-layout>
              <v-layout wrap v-show="bumpTab === 1">
                <v-flex xs9 sm9 md9>
                  <v-select
                    label="Boat"
                    item-text="short"
                    v-model="manualBoat"
                    return-object
                    required
                    :items="divBoats"
                  ></v-select>
                </v-flex>
                <v-flex xs3 sm3 md3>
                  <v-text-field
                    label="Move by"
                    v-model="bumpMoves"
                    :rules="[(v) => !isNaN(v) || 'Has to be a number']"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <small class="pl-3 noselect">*required field</small>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="bumpDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!verified || loading" @click.native="submitBump()">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
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
          <v-btn color="primary"  @click.native.stop="bumpDialog = !bumpDialog" v-if="verified">
            <v-icon>timeline</v-icon> Data
          </v-btn>
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
      countDownDate: new Date('February 27, 2019 12:00:00').getTime(),
      announcementDraft: '',
      bladesOnly: false,
      spoonsOnly: false,
      loading: false,
      announcement: '',
      socket: false,
      boatsSelected: [],
      name: 'live',
      drawer: false,
      scale: 0.35,
      timer: 0,
      startYear: new Date().getFullYear(),
      isLive: false,
      liveTimer: false,
      bumpAction: 'bumps',
      viewers: 0,
      features: [
        {key: 'localtime', text: 'Race times are displayed in your local time :)'},
        {key: 'crewlist', text: `Click on a boat's crest to see its crew list!`},
        {key: 'crewlisthist', text: 'We now added crew lists for all events back until 2017'},
        {key: 'history', text: 'We added much more historic data as far as 1826!'}
      ],
      feature: null,
      reporters: 0,
      rowOvers: [],
      clubSelected: false,
      bumpBoat: false,
      manualBoat: false,
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
      boatSelected: {},
      verified: false,
      bumpGender: 'men',
      bumpMoves: 0,
      bumpDay: 1,
      bumpDivision: 1,
      bumpDialog: false,
      announceDialog: false,
      startEvent: 0,
      bumpTab: 0,
      points: {},
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
        const bump = message
        const club = bump.club
        const gender = bump.gender
        const name = bump.name
        const year = parseInt(bump.year, 10)
        const number = parseInt(bump.number, 10)
        const day = parseInt(bump.day, 10)
        const move = bump.move
        let hasChanged = false
        if (this.event.year !== year || this.event.name.toLowerCase() !== name)
          return
        if (this.chartData[club][gender][number].moves.length >= day) {
          hasChanged = this.chartData[club][gender][number].moves[day-1].status !== move.status
          Vue.set(this.chartData[club][gender][number].moves, day-1, move)
        } else
          this.chartData[club][gender][number].moves.push(move)
        if (hasChanged)
          this.notify(`${this.clubToName(club)} ${(gender === 'men' ? 'M' : 'W')}${this.romanize(number + 1)} result ${(move.status ? 'confirmed' : 'withdrawn')}`, 'info')
        else
          this.notify(`${this.clubToName(club)} ${(gender === 'men' ? 'M' : 'W')}${this.romanize(number + 1)} moves ${move.moves}`, 'info')
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
    bumpDivision() {
      this.bumpDay = this.eventDay
    },
    bumpDay() {
      if (!this.verified) {
        return
      }
      if (this.bumpDay < this.eventDay && !confirm('You are about to change a past division, do you know what you are doing?'))
        setTimeout(() => this.bumpDay = this.eventDay, 1)
      else if (this.bumpDay > this.eventDay && !confirm('You are about to change a future division, do you know what you are doing?'))
        setTimeout(() => this.bumpDay = this.eventDay, 1)
    },
    bumpBoat() {
      if (this.bumpBoat)
        this.bumpGender = this.bumpBoat.gender
      this.rowOvers = [this.bumpBoat]
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
      return (this.event && this.event.name.toLowerCase() === 'torpids' ? 12 : 13)
    },
    divBoats() {
      const rows = (this.bumpGender === 'men' ? this.rowsMen : this.rowsWomen)
      const divs = (this.bumpGender === 'men' ? this.divsMen : this.divsWomen)
      let boats = (this.bumpGender === 'men' ? this.boatsMen : this.boatsWomen)
      if (this.bumpDivision !== 'all') {
        const start = Math.max(0, ((this.bumpDivision - 1) * this.boatsPerDiv)-1)
        let end = Math.min(rows, (this.bumpDivision * this.boatsPerDiv)+1)
        if (this.bumpDivision === divs.length)
          end = rows+1
        boats = boats.slice(start, end)
      }
      if (!this.bumpBoat || !boats.find((boat) => boat.short === this.bumpBoat.short))
        this.bumpBoat = boats[0]
      return boats
    },
    bumpBoats() {
      const boats = this.divBoats.filter((boat) => this.isActive(boat))
      if (!boats.find((boat) => boat.short === this.bumpBoat.short) && boats.length > 1)
        this.bumpBoat = boats[1]
      else if (boats.length === 1)
        this.bumpBoat = boats[0]
      return boats
    },
    rowOverBoats() {
      return this.bumpBoats.filter((boat) => !boat.moves[this.bumpDay-1])
    },
    bumpedBoat() {
      if (!this.bumpBoat)
        return []
      let boats = (this.bumpGender === 'men' ? this.boatsMen : this.boatsWomen)
      boats = boats.filter((boat) => this.curPos(boat, this.bumpDay) < this.curPos(this.bumpBoat, this.bumpDay))
      boats = boats.filter((boat) => this.isActive(boat))
      boats.sort((a, b) => this.curPos(b, this.bumpDay) - this.curPos(a, this.bumpDay))
      if (!boats.length)
        this.bumpAction = 'row over'
      else
        this.bumpAction = 'bumps'
      return boats[0]
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
      if (this.divs)
        return this.divs.men.map((time, idx) => ({time: time, number: idx + 1}))
      const ary = Array.from({length: Math.ceil(this.rowsMen / this.boatsPerDiv)}, (x,i) => i)
      ary.shift()
      return ary.map((itm, idx) => ({number: idx+1}))
    },
    divsWomen() {
      if (this.divs)
        return this.divs.women.map((time, idx) => ({time: time, number: idx + 1}))
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
      return boats.sort((a,b) => this.curPos(a, this.bumpDay)-this.curPos(b, this.bumpDay))
    },
    boatsWomen() {
      let boats = []
      for (const key in this.chartData) {
        this.chartData[key].women.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].women)
      }
      return boats.sort((a,b) => this.curPos(a, this.bumpDay)-this.curPos(b, this.bumpDay))
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
    validateYear(val) {
      let year
      try {
        year = parseInt(val, 10)
      } catch (e) {
        return 'Please provide a valid year'
      }
      if (year < new Date().getFullYear())
        return 'You cannot create starting order for the past'
      return true
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
    boatDiv(boat) {
      const divs = (boat.gender === 'men' ? this.divsMen : this.divsWomen)
      return Math.min(Math.ceil(boat.start / this.boatsPerDiv), divs.length)
    },
    isActive(boat) {
      const hasBumped = (bt) => {
        return this.divBoats.find((b) => this.curPos(b, this.bumpDay - 1) < this.curPos(bt, this.bumpDay - 1) && this.curPos(b, this.bumpDay) > this.curPos(bt, this.bumpDay))
      }
      const isSandwich = bt => this.boatDiv(bt) > this.bumpDivision
      if (this.event.name.toLowerCase() === 'torpids')
        return !boat.moves[this.bumpDay-1] || !hasBumped(boat) || isSandwich(boat)
      else if (this.event.name.toLowerCase() === 'eights')
        return !boat.moves[this.bumpDay-1] || (isSandwich(boat) && !boat.moves[this.bumpDay-1])
    },
    makeAnnouncement() {
      const txt = this.announcementDraft.trim()
      if (txt.length) {
        axios.post('/announce', {text: txt}, {headers: {'authorization': this.auth}})
          .then(() => {
            this.announceDialog = false
            this.notify('Announcement made', 'success')
          })
          .catch(error => {
            this.notify('Failed to make announcement', 'error')
            console.log(error.response.data)
          })
      }
    },
    onResize () {
      clearTimeout(this.timer)
      this.timer = setTimeout(function() {
        const width = document.getElementById('svg-container').offsetWidth
        this.scale = Math.min(width * 0.63 / 780, 0.63)
      }.bind(this), 150)
    },
    confirmBoat(boat) {
      if (this.verified) {
        const lastMove = boat.moves[boat.moves.length-1]
        axios.post('/bump', {
          year: this.event.year,
          name: this.event.name,
          day: boat.moves.length,
          bumpBoat: boat,
          moves: lastMove.moves,
          status: !lastMove.status
        }, {headers: {'authorization': this.auth}})
        .then(() => this.notify(`Result ${lastMove.status ? 'withdrawn' : 'confirmed'}`, 'success'))
        .catch(error => {
          console.log(error.response.data)
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
    submitBump() {
      if (this.bumpTab === 1 && this.manualBoat
        && this.manualBoat.moves[this.bumpDay-1]
        && this.manualBoat.moves[this.bumpDay-1].status
        && !confirm('You are about to edit a confirmed result, do you know what you are doing?'))
        return
      this.loading = true
      axios.post('/bump', {
        year: this.event.year,
        name: this.event.name,
        day: this.bumpDay,
        moves: parseInt(this.bumpMoves, 10),
        status: (this.manualBoat && this.manualBoat.moves[this.bumpDay-1] ? this.manualBoat.moves[this.bumpDay-1].status : undefined),
        bumpBoat: (this.bumpTab === 0 ? this.bumpBoat : this.manualBoat),
        rowOvers: (this.bumpTab === 0 && this.bumpAction === 'row over' ? this.rowOvers : undefined),
        bumpedBoat: (this.bumpTab === 0 && this.bumpAction === 'bumps' ? this.bumpedBoat : undefined)
      }, {headers: {'authorization': this.auth}})
      .then(() => this.notify('Bump submitted', 'success'))
      .catch(error => {
        console.log(error.response.data)
        this.notify('Failed to submit bump', 'error')
      }).then(() => this.loading = false)
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
          this.bumpBoat = this.boats[0]
          this.bumpDay = this.eventDay
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
      this.bumpDivision = this.boatDiv(boat)
      this.bumpBoat = boat
      this.manualBoat = boat
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
    curPoint(boat) {
      return {
        x: -5 + 80 * boat.moves.length,
        y: boat.moves.reduce((acc, itm) => acc + itm.moves, 0) * (47.5 + 10) * -1
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
