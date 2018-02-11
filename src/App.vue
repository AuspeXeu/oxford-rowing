<template>
<div>
  <svg width="420" :height="Math.max(rowsMen, rowsWomen) * 36" style="background:red;display:block;margin:auto;">
    <defs>
      <g id="BRC" transform="translate(-517,-234),scale(0.5)">
        <circle style="opacity:1;fill:#000102;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" cx="1034.2858" cy="469.50507" r="47.5" />
      </g>
      <g id="PMB" transform="translate(-257,212),matrix(1,0,0,1,465.143,-470.076),scale(0.5)"><circle cx="-417.143" cy="518.076" r="47.5" id="path4304-1-4-3" stroke="#000000" stroke-width="1" stroke-miterlimit="4" stroke-dasharray="" stroke-opacity="1" fill="#FFFFFF" fill-opacity="1" opacity="1"/><path d=" M -417.143 471.001 C -421.366 471.004 -425.57 471.565 -429.643 472.669 L -429.643 563.396 C -425.572 564.515 -421.368 565.09 -417.143 565.108 C -412.92 565.105 -408.716 564.544 -404.643 563.44 L -404.643 472.713 C -408.714 471.594 -412.918 471.018 -417.143 471.001 Z" id="rect4858-8-2-6" stroke="none" stroke-width="1" stroke-miterlimit="4" stroke-dasharray="" stroke-opacity="1" fill="#FF727D" fill-opacity="1" opacity="1"/></g>
      <g id="BAL" transform="translate(-2,-280),scale(0.5)">
        <circle style="opacity:1;fill:#0f2e61;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" cx="2.8571453" cy="418.07651" r="47.5" />
        <path style="opacity:1;fill:#c91a17;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="m 2.85711,371.00081 a 47.5,47.053571 0 0 0 -12.5,1.66778 l 0,90.7271 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 l 0,-90.72711 a 47.5,47.053571 0 0 0 -12.5,-1.71227 z" />
      </g>
      <g id="EXC" transform="scale(0.5),matrix(1,0,0,1,-386.286,-192.934),translate(-48,-45)"><circle cx="434.286" cy="240.934" r="47.5" id="path4304-7-0-8" stroke="#000000" stroke-width="1" stroke-miterlimit="4" stroke-dasharray="" stroke-opacity="1" fill="#C30B0B" fill-opacity="1" opacity="1"/></g>
      <g id="DUMMY" transform="scale(0.5)">
        <circle style="opacity:1;fill:#e9cb07;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" cx="0" cy="0" r="50" />
      </g>
      <g id="BLANK" transform="scale(0.5)">
    <circle
       style="opacity:1;fill:#e9cb07;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       cx="48"
       cy="48"
       r="47.5" />
    <path
       style="opacity:1;fill:#9d0505;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       d="m 47.999877,0.9242945 a 47.5,47.053571 0 0 0 -12.5,1.6677799 V 93.319175 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.6365644 a 47.5,47.053571 0 0 0 -12.5,-1.7122699 z" />
      </g>
      <g id="SCO" transform="scale(0.5)">
        <circle style="opacity:1;fill:#46bada;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" cx="0" cy="0" r="50" />
        <circle style="opacity:1;fill:#761b2e;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" cx="0" cy="0" r="25" />
      </g>
    </defs>
    <g id="containerMen" transform="scale(0.5)">
      <g v-for="boat in boatsMen" :transform="'translate(30,' + (37 + (boat.start - 1) * 70 ) + ')'">
        <path :d="makeLine(boat)" fill="transparent" style="stroke:purple;stroke-width:10;" />
        <use xlink:href="#BLANK" @click="selectBoat(boat)"></use>
        <!-- <use v-bind:xlink:href="'#' + boat.id" @click="selectBoat(boat)"></use> -->
        <use xlink:href="#BLANK" @click="selectBoat(boat)" :transform="'translate('+curPos(boat).x+',' + curPos(boat).y + ')'"></use>
        <!-- <use v-bind:xlink:href="'#' + boat.id" @click="selectBoat(boat)"></use> -->
        <circle v-for="point in makePoints(boat)" :cx="point.x" :cy="point.y" r="10" stroke="purple" stroke-width="3" fill="purple" />
      </g>
    </g>
    <g id="containerWomen" transform="translate(220,0),scale(0.5)">
      <g v-for="boat in boatsMen" :transform="'translate(30,' + (37 + (boat.start - 1) * 70 ) + ')'">
        <path :d="makeLine(boat)" fill="transparent" style="stroke:purple;stroke-width:10;" />
        <circle v-for="point in makePoints(boat)" :cx="point.x" :cy="point.y" r="10" stroke="purple" stroke-width="3" fill="purple" />
        <use xlink:href="#BLANK" @click="selectBoat(boat)"></use>
        <!-- <use v-bind:xlink:href="'#' + boat.id" @click="selectBoat(boat)"></use> -->
        <use xlink:href="#BLANK" @click="selectBoat(boat)" :transform="'translate('+curPos(boat).x+',' + curPos(boat).y + ')'"></use>
        <!-- <use v-bind:xlink:href="'#' + boat.id" @click="selectBoat(boat)"></use> -->
      </g>
    </g>
  </svg>
</div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
export default {
  data() {
    return {
      name: 'Oxford-Bumps',
      chartData: {}
    }
  },
  mounted() {
    axios.get('./static/torpids_2016_men.csv')
      .then((response) => {
        const data = response.data.split('\n').map((line) => line.split(','))
        data.forEach((itm, idx) => {
          if (!this.chartData[itm[1]])
            Vue.set(this.chartData, itm[1], {men: [], women:[]})
          this.chartData[itm[1]].men.push({
            start: idx + 1,
            moves: itm.slice(2, itm.length).map((move) => parseInt(move, 10))
          })
        })
      })
  },
  computed: {
    boatsMen() {
      let boats = []
      for (let key in this.chartData) {
        this.chartData[key].men.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].men)
      }
      return boats
    },
    rowsMen() {
      let rows = 0
      for (let key in this.chartData) {
        rows += this.chartData[key].men.length
      }
      return rows
    },
    rowsWomen() {
      let rows = 0
      for (let key in this.chartData) {
        rows += this.chartData[key].women.length
      }
      return rows
    }
  },
  methods: {
    selectBoat(boat) {
      console.log(boat.id, boat.start)
    },
    curPos(boat) {
      return {
        x: 85 * boat.moves.length,
        y: boat.moves.reduce((acc, itm) => acc + itm, 0) * 70 * -1
      }
    },
    makePoints(boat) {
      let cur = 0
      return boat.moves.slice(0, boat.moves.length-1).map((move, idx) => {
        cur += move * 70 * -1
        return {
          x: 85 * idx,//(idx+1),
          y: cur
        }
      })
    },
    makeLine(boat) {
      let line = 'M 0 0'
      let cur = 0
      boat.moves.forEach((move, idx) => {
        cur += move * 70 * -1
        line += `L ${85 * (idx+1)} ${cur}`
      })
      return line
    },
    inc() {
      this.rows += 1
    }
  }
}
</script>

<style>
</style>
