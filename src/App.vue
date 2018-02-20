<template>
<div id="app">
  <v-app>
    <v-toolbar fixed app dense>
      <v-toolbar-title style="margin-left:15px;">
        <v-tooltip bottom>
          <v-icon slot="activator" v-show="reporters > 0 || viewers > 0" :class="{ live: isLive }">{{(viewers > 1 ? 'people' : 'person')}}</v-icon>
          <span>
            {{`${reporters} reporter${(reporters > 1 ? 's are' : ' is')} online`}}</br>
            {{`${viewers} viewer${(viewers > 1 ? 's are' : ' is')} online`}}
          </span>
        </v-tooltip>
        <span class="hidden-sm-and-down noselect">Live Bumps</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon v-show="false" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items style="margin-right:15px;">
        <v-select
          :items="boats"
          item-text="short"
          attach
          v-model="boatsSelected"
          :label="lblCrewSel"
          autocomplete
          append-icon="search"
          clearable
          dense
          multiple
          single-line
          class="mt-2 noselect"
        ></v-select>
        <v-menu offset-y left attach>
          <v-btn class="menu-btn mt-2 ml-1" color="primary" dark slot="activator" ripple>{{(event ? `${event.name} ${event.year}` : '')}}</v-btn>
          <v-list dense>
            <v-list-tile v-for="event in events" :key="event.year+event.name" @click="loadData(event)">
              <v-list-tile-title>{{`${event.name} ${event.year}`}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <svg width="452" :height="Math.max(rowsMen, rowsWomen) * 28.75">
          <defs>
            <g id="UCO" transform="scale(0.5)">
              <circle
                 r="47.5"
                 cy="48"
                 cx="48"
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <rect
                 transform="rotate(90)"
                 y="-75.256775"
                 x="40.702835"
                 height="54.185627"
                 width="14.338641"
                 style="opacity:1;fill:#ffff00;fill-opacity:1;stroke:none;stroke-width:1.80000639;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <rect
                 transform="scale(-1)"
                 y="-75.639122"
                 x="-55.060841"
                 height="54.185242"
                 width="14.339063"
                 style="opacity:1;fill:#ffff00;fill-opacity:1;stroke:none;stroke-width:1.80002642;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g id="BAL" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#0f2e61;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#c91a17;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.486685,1.1825945 a 47.5,47.053571 0 0 0 -12.5,1.66778 V 93.577474 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.8948645 a 47.5,47.053571 0 0 0 -12.5,-1.71227 z"/>
            </g>
            <g id="SOM" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ed1212;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 47.991228,0.97210566 A 47.500595,47.053571 0 0 0 35.491072,2.6398857 V 93.366986 a 47.500595,47.053571 0 0 0 12.500156,1.71226 47.500595,47.053571 0 0 0 12.500157,-1.66776 V 2.6843757 A 47.500595,47.053571 0 0 0 47.991228,0.97210566 Z"/>
            </g>
            <g id="SJO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 95.054207,48.19399 a 47.053596,47.5 0 0 0 -1.667781,-12.5 H 2.6592789 a 47.053596,47.5 0 0 0 -1.71226091,12.5 47.053596,47.5 0 0 0 1.66776091,12.5 H 93.341936 a 47.053596,47.5 0 0 0 1.712271,-12.5 z"/>
              <path
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 48.013333,95.025495 A 47.500595,47.053571 0 0 0 60.51349,93.357715 V 2.6306155 A 47.500595,47.053571 0 0 0 48.013333,0.91835546 47.500595,47.053571 0 0 0 35.513177,2.5861155 V 93.313225 a 47.500595,47.053571 0 0 0 12.500156,1.71227 z"/>
            </g>
            <g id="SHI" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 transform="rotate(135)"
                 d="m 47.539077,-67.922638 a 47.5,47.5 0 0 1 -23.750001,41.136207 47.5,47.5 0 0 1 -47.500001,-1e-6 47.5,47.5 0 0 1 -23.749998,-41.136208"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.5"
                 sodipodi:rx="47.5"
                 sodipodi:cy="-67.922638"
                 sodipodi:cx="0.039076731"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 transform="matrix(0.70710737,-0.70710619,0.70710737,0.70710619,0,0)"
                 d="m 47.46008,67.690628 a 47.500038,47.500038 0 0 1 -23.750019,41.136242 47.500038,47.500038 0 0 1 -47.500039,0 47.500038,47.500038 0 0 1 -23.750018,-41.136244"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.500038"
                 sodipodi:rx="47.500038"
                 sodipodi:cy="67.690628"
                 sodipodi:cx="-0.039957896"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
            </g>
            <g id="SHG" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 transform="rotate(90)"
                 d="m 95.500004,-47.999695 a 47.5,47.5 0 0 1 -23.750001,41.1362072 47.5,47.5 0 0 1 -47.5,-1.1e-6 A 47.5,47.5 0 0 1 0.50000381,-47.999697"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.5"
                 sodipodi:rx="47.5"
                 sodipodi:cy="-47.999695"
                 sodipodi:cx="48.000004"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#ffff00;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 transform="rotate(-90)"
                 d="M -0.50000381,47.972382 A 47.5,47.500305 0 0 1 -24.250004,89.108853 47.5,47.500305 0 0 1 -71.750005,89.108852 47.5,47.500305 0 0 1 -95.500004,47.972379"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.500305"
                 sodipodi:rx="47.5"
                 sodipodi:cy="47.972382"
                 sodipodi:cx="-48.000004"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#000000;stroke-width:1.00000322;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.309119,1.0050343 a 47.5,47.053571 0 0 0 -12.5,1.66778 V 93.399915 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.7173043 a 47.5,47.053571 0 0 0 -12.5,-1.71227 z"/>
            </g>
            <g id="SCO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#46bada;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <ellipse
                 style="opacity:1;fill:#761b2e;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="47.891251"
                 cy="48.10878"
                 rx="24.422501"
                 ry="24.422476" />
            </g>
            <g id="SBH" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#15468a;fill-opacity:1;stroke:none;stroke-width:1.00000644;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 48.486837,0.94584658 A 47.500614,47.053571 0 0 0 35.986686,2.6136266 V 93.340727 a 47.500614,47.053571 0 0 0 12.500151,1.71226 47.500614,47.053571 0 0 0 12.500162,-1.66776 V 2.6581166 A 47.500614,47.053571 0 0 0 48.486837,0.94584658 Z"/>
            </g>
            <g id="SAY" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 transform="rotate(90)"
                 d="m 95.500004,-47.999695 a 47.5,47.5 0 0 1 -23.750001,41.1362072 47.5,47.5 0 0 1 -47.5,-1.1e-6 A 47.5,47.5 0 0 1 0.50000381,-47.999697"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.5"
                 sodipodi:rx="47.5"
                 sodipodi:cy="-47.999695"
                 sodipodi:cx="48.000004"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#e6b810;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 transform="rotate(-90)"
                 d="M -0.50000381,47.879467 A 47.5,47.5 0 0 1 -24.250004,89.015674 47.5,47.5 0 0 1 -71.750005,89.015673 47.5,47.5 0 0 1 -95.500004,47.879465"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.5"
                 sodipodi:rx="47.5"
                 sodipodi:cy="47.879467"
                 sodipodi:cx="-48.000004"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#ff0000;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 47.991228,0.88839941 A 47.500594,47.053571 0 0 0 35.491072,2.5561794 V 93.28328 a 47.500594,47.053571 0 0 0 12.500156,1.71226 47.500594,47.053571 0 0 0 12.500157,-1.66776 V 2.6006694 A 47.500594,47.053571 0 0 0 47.991228,0.88839941 Z"/>
            </g>
            <g id="RPC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ed1212;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 95.180949,48.245688 a 47.053571,47.5 0 0 0 -1.66778,-12.5 H 2.7860681 a 47.053571,47.5 0 0 0 -1.71226,12.5 47.053571,47.5 0 0 0 1.66776,12.5 H 93.468679 a 47.053571,47.5 0 0 0 1.71227,-12.5 z"/>
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.250087,95.052987 c 4.223035,-0.003 8.426805,-0.534298 12.500157,-1.638186 V 2.5027365 C 56.678943,1.3838225 52.475137,0.96335915 48.250087,0.94584657 44.027053,0.9488618 39.838081,1.7464796 35.764728,2.8503611 V 93.103963 c 4.0713,1.118917 8.260309,1.931508 12.485359,1.949024 z"
                 sodipodi:nodetypes="ccccccc" />
            </g>
            <g id="QCO" transform="scale(0.5)">
              <circle
                 r="47.5"
                 cy="48.000004"
                 cx="48"
                 style="opacity:1;fill:#03035c;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
              <path
                 d="m 94.817404,47.809263 a 47.053571,47.5 0 0 0 -1.66778,-12.5 H 2.4225235 a 47.053571,47.5 0 0 0 -1.71226002,12.5 47.053571,47.5 0 0 0 1.66776002,12.5 H 93.105134 a 47.053571,47.5 0 0 0 1.71227,-12.5 z"
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
            </g>
            <g id="PMB" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#fff;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#ff727d;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.158483,0.99303202 a 47.5,47.053571 0 0 0 -12.5,1.66777998 v 90.7271 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.705302 a 47.5,47.053571 0 0 0 -12.5,-1.71226998 z"/>
            </g>
            <g id="OSG" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <ellipse
                 style="opacity:1;fill:#ba0a0a;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48.025181"
                 cy="48.309673"
                 rx="24.422501"
                 ry="24.422476" />
            </g>
            <g id="ORO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#f0f0f0;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#1c4882;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;"
                 d="M 53.09375,1.0449449 V 24.382835 a 24.422476,24.422476 0 0 1 19.328125,23.87305 24.422476,24.422476 0 0 1 -19.328125,23.85547 v 23.31445 A 47.5,47.5 0 0 0 95.5,48.255885 47.5,47.5 0 0 0 53.09375,1.0449449 Z m -10.333984,0.0586 A 47.5,47.5 0 0 0 0.50000016,48.255885 47.5,47.5 0 0 0 42.759766,95.441435 V 72.091825 A 24.422476,24.422476 0 0 1 23.578125,48.255885 24.422476,24.422476 0 0 1 42.759766,24.433615 Z"/>
            </g>
            <g id="NEC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#a54a8d;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#f3df04;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.074934,1.0139583 a 47.500595,47.053571 0 0 0 -12.500156,1.66778 V 93.408838 a 47.500595,47.053571 0 0 0 12.500156,1.71226 47.500595,47.053571 0 0 0 12.500157,-1.66776 V 2.7262283 a 47.500595,47.053571 0 0 0 -12.500157,-1.71227 z"/>
            </g>
            <g id="MER" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#f0f0f0;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <rect
                 style="opacity:1;fill:#834898;fill-opacity:1;stroke:none;stroke-width:1.80000627;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.338641"
                 height="54.185623"
                 x="40.46608"
                 y="-74.546509"
                 transform="rotate(90)" />
              <rect
                 style="opacity:1;fill:#834898;fill-opacity:1;stroke:none;stroke-width:1.80002642;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.339062"
                 height="54.185242"
                 x="-54.113815"
                 y="-74.692093"
                 transform="scale(-1)" />
            </g>
            <g id="MAN" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#eb0707;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <rect
                 style="opacity:1;fill:#dec30a;fill-opacity:1;stroke:none;stroke-width:1.80000639;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.338641"
                 height="54.185627"
                 x="39.992569"
                 y="-74.546516"
                 transform="rotate(90)" />
              <rect
                 style="opacity:1;fill:#dec30a;fill-opacity:1;stroke:none;stroke-width:1.80002642;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.339063"
                 height="54.185242"
                 x="-54.58733"
                 y="-74.692101"
                 transform="scale(-1)" />
            </g>
            <g id="MAG" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#000000;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <ellipse
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48.59795"
                 cy="47.638832"
                 rx="24.422501"
                 ry="24.422476" />
            </g>
            <g id="LMH" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#0f277f;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 sodipodi:type="arc"
                 sodipodi:cx="-47.999687"
                 sodipodi:cy="47.999672"
                 sodipodi:rx="47.5"
                 sodipodi:ry="47.5"
                 sodipodi:start="4.7162319"
                 sodipodi:end="1.5898416"
                 d="M -47.817149,0.50002268 A 47.5,47.5 0 0 1 -6.653495,24.617149 47.5,47.5 0 0 1 -7.1994615,72.322328 47.5,47.5 0 0 1 -48.904283,95.491058"
                 sodipodi:open="true"
                 transform="scale(-1,1)" />
              <path
                 style="opacity:1;fill:#0f277f;fill-opacity:1;stroke:#000000;stroke-width:1.00000262;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 sodipodi:type="arc"
                 sodipodi:cx="48.721745"
                 sodipodi:cy="-47.991409"
                 sodipodi:rx="47.500252"
                 sodipodi:ry="47.5"
                 sodipodi:start="4.7162319"
                 sodipodi:end="1.5898416"
                 d="m 48.904284,-95.491059 a 47.500252,47.5 0 0 1 41.163872,24.117127 47.500252,47.5 0 0 1 -0.54597,47.705178 47.500252,47.5 0 0 1 -41.705042,23.1687303"
                 sodipodi:open="true"
                 transform="scale(1,-1)" />
              <path
                 style="opacity:1;fill:#e9dc07;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 48.06826,0.96040316 A 47.5,47.03125 0 0 0 43.01748,1.2807132 V 94.741652 a 47.5,47.03125 0 0 0 5.05078,0.28125 47.5,47.03125 0 0 0 5.04883,-0.32031 V 1.2709532 a 19.190474,48.513557 0 0 0 -0.0723,-0.041 47.5,47.03125 0 0 0 -4.97656,-0.26953004 z"/>
            </g>
            <g id="LIN" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#dec416;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 81.271906,14.728113 A 47.5,47.053571 45 0 0 71.253776,7.0685834 L 7.1000254,71.222323 a 47.5,47.053571 45 0 0 7.6280806,10.04959 47.5,47.053571 45 0 0 10.01812,7.65955 l 64.15376,-64.15376 a 47.5,47.053571 45 0 0 -7.62808,-10.04959 z"/>
              <path
                 style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 81.271916,81.271923 a 47.053571,47.5 45 0 0 7.65953,-10.01813 L 24.777706,7.1000434 a 47.053571,47.5 45 0 0 -10.04959,7.6280796 47.053571,47.5 45 0 0 -7.6595506,10.01812 l 64.1537606,64.15376 a 47.053571,47.5 45 0 0 10.04959,-7.62808 z"/>
            </g>
            <g id="LIC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#2c6484;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#40b8ca;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 48.101959,1.0240712 A 47.500595,47.053571 0 0 0 35.601803,2.6918513 V 93.418951 a 47.500595,47.053571 0 0 0 12.500156,1.71226 47.500595,47.053571 0 0 0 12.500157,-1.66776 V 2.7363413 A 47.500595,47.053571 0 0 0 48.101959,1.0240712 Z"/>
            </g>
            <g id="GTM" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#235f11;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 sodipodi:type="arc"
                 sodipodi:cx="-47.999687"
                 sodipodi:cy="47.999672"
                 sodipodi:rx="47.5"
                 sodipodi:ry="47.5"
                 sodipodi:start="4.7162319"
                 sodipodi:end="1.5898416"
                 d="M -47.817149,0.50002268 A 47.5,47.5 0 0 1 -6.653495,24.617149 47.5,47.5 0 0 1 -7.1994615,72.322328 47.5,47.5 0 0 1 -48.904283,95.491058"
                 sodipodi:open="true"
                 transform="scale(-1,1)" />
              <path
                 style="opacity:1;fill:#2a5c7e;fill-opacity:1;stroke:#000000;stroke-width:1.00000262;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 sodipodi:type="arc"
                 sodipodi:cx="48.721748"
                 sodipodi:cy="-47.991409"
                 sodipodi:rx="47.500252"
                 sodipodi:ry="47.5"
                 sodipodi:start="4.7162319"
                 sodipodi:end="1.5898416"
                 d="M 48.904288,-95.491059 A 47.500252,47.5 0 0 1 90.06816,-71.373932 47.500252,47.5 0 0 1 89.52219,-23.668754 47.500252,47.5 0 0 1 47.817148,-0.5000237"
                 sodipodi:open="true"
                 transform="scale(1,-1)" />
              <path
                 style="opacity:1;fill:#dbae11;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 47.817179,0.98407 c -1.688146,0.0178226 -3.374132,0.1247444 -5.05078,0.32031 l 0.0037,93.406007 c 1.677353,0.182513 3.359674,0.331328 5.047118,0.336182 1.687495,-0.01789 3.369166,-0.04058 5.045168,-0.236081 L 52.862273,1.1684724 C 52.838183,1.1546881 49.469265,0.94621017 47.817149,0.98409 Z"
                 sodipodi:nodetypes="cccccccc" />
            </g>
            <g id="EXC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#c30b0b;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
            </g>
            <g id="COO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#121078;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#740404;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.172393,1.0077731 a 47.5,47.053571 0 0 0 -12.5,1.66778 V 93.402653 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.7200431 a 47.5,47.053571 0 0 0 -12.5,-1.71227 z"/>
            </g>
            <g id="CHB" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#12266e;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5"/>
            </g>
            <g id="BRC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#000102;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5"/>
            </g>
            <g id="KEB" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#f0f0f0;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#c40606;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.072364,0.94584655 a 47.5,47.053571 0 0 0 -12.5,1.66777995 V 93.340727 a 47.5,47.053571 0 0 0 12.5,1.712258 47.5,47.053571 0 0 0 12.5,-1.667758 V 2.6581165 a 47.5,47.053571 0 0 0 -12.5,-1.71226995 z"/>
            </g>
            <g id="JEO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#0e922b;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
            </g>
            <g id="HEC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#9e1616;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#f0f0f0;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 47.823661,0.8884003 a 47.5,47.053571 0 0 0 -12.5,1.66778 V 93.283281 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.6006703 a 47.5,47.053571 0 0 0 -12.5,-1.71227 z"/>
            </g>
            <g id="SAC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ed1212;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#cccccc;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 47.776578,0.94584657 A 47.500595,47.053571 0 0 0 35.276422,2.6136266 V 93.340727 a 47.500595,47.053571 0 0 0 12.500156,1.71226 47.500595,47.053571 0 0 0 12.500157,-1.66776 V 2.6581166 A 47.500595,47.053571 0 0 0 47.776578,0.94584657 Z"/>
            </g>
            <g id="SEH" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#ffea00;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path4304-31-1-8-5"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <rect
                 style="opacity:1;fill:#981206;fill-opacity:1;stroke:none;stroke-width:1.95665586;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.338641"
                 height="54.185242"
                 x="39.755814"
                 y="-74.782883"
                 transform="rotate(90)" />
              <rect
                 style="opacity:1;fill:#981206;fill-opacity:1;stroke:none;stroke-width:1.95665586;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.339063"
                 height="54.185242"
                 x="-55.060837"
                 y="-75.165611"
                 transform="scale(-1)" />
            </g>
            <g id="SPC" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 transform="rotate(90)"
                 d="m 95.500004,-47.999695 a 47.5,47.5 0 0 1 -23.750001,41.1362072 47.5,47.5 0 0 1 -47.5,-1.1e-6 A 47.5,47.5 0 0 1 0.50000381,-47.999697"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.5"
                 sodipodi:rx="47.5"
                 sodipodi:cy="-47.999695"
                 sodipodi:cx="48.000004"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#e9cb07;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 transform="rotate(-90)"
                 d="m -0.49754333,47.997154 a 47.5,47.500305 0 0 1 -23.75000067,41.136472 47.5,47.500305 0 0 1 -47.500001,-2e-6 47.5,47.500305 0 0 1 -23.749998,-41.136472"
                 sodipodi:open="true"
                 sodipodi:end="3.1415927"
                 sodipodi:start="0"
                 sodipodi:ry="47.500305"
                 sodipodi:rx="47.5"
                 sodipodi:cy="47.997154"
                 sodipodi:cx="-47.997543"
                 sodipodi:type="arc"
                 style="opacity:1;fill:#1c6810;fill-opacity:1;stroke:#000000;stroke-width:1.00000322;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.004303,0.9930311 a 47.500594,47.053571 0 0 0 -12.500156,1.66778 V 93.387911 a 47.500594,47.053571 0 0 0 12.500156,1.71226 47.500594,47.053571 0 0 0 12.500157,-1.66776 V 2.7053011 a 47.500594,47.053571 0 0 0 -12.500157,-1.71227 z"/>
            </g>
            <g id="TRO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#00007f;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 cx="48"
                 cy="48"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="m 48.249931,0.94584657 a 47.5,47.053571 0 0 0 -12.5,1.66778003 V 93.340727 a 47.5,47.053571 0 0 0 12.5,1.71226 47.5,47.053571 0 0 0 12.5,-1.66776 V 2.6581166 a 47.5,47.053571 0 0 0 -12.5,-1.71227003 z" />
            </g>
            <g id="WRO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#000000;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path4304-31-1-8"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <rect
                 style="opacity:1;fill:#ff00ff;fill-opacity:1;stroke:none;stroke-width:1.80000639;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect4218-3-6-0"
                 width="14.338641"
                 height="54.185627"
                 x="40.702831"
                 y="-75.256775"
                 transform="rotate(90)" />
              <rect
                 style="opacity:1;fill:#ff00ff;fill-opacity:1;stroke:none;stroke-width:1.80002642;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="rect4218-3-6-6-2"
                 width="14.339063"
                 height="54.185242"
                 x="-55.297592"
                 y="-75.875877"
                 transform="scale(-1)" />
            </g>
            <g id="WOO" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#e9cb07;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path4304"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <path
                 style="opacity:1;fill:#9d0505;fill-opacity:1;stroke:none;stroke-width:1.0000062;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 d="M 48.023796,0.96935231 A 47.500595,47.053571 0 0 0 35.52364,2.6371323 V 93.364233 a 47.500595,47.053571 0 0 0 12.500156,1.71226 47.500595,47.053571 0 0 0 12.500157,-1.66776 V 2.6816223 A 47.500595,47.053571 0 0 0 48.023796,0.96935231 Z" />
            </g>
            <g id="WAD" transform="scale(0.5)">
              <circle
                 style="opacity:1;fill:#79b0e7;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 id="path4304-31-1-8-5"
                 cx="48"
                 cy="48.000004"
                 r="47.5" />
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.79999995;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.338641"
                 height="54.185242"
                 x="39.755814"
                 y="-74.782883"
                 transform="rotate(90)" />
              <rect
                 style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.80002642;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                 width="14.339063"
                 height="54.185242"
                 x="-55.060837"
                 y="-75.165611"
                 transform="scale(-1)" />
            </g>
          </defs>
          <g id="containerMen" transform="scale(0.5),translate(5,7)">
            <g v-for="div in divsMen" :transform="`translate(0,${(((12 * div.number)  * (47.5 + 10)) -5)})`">
              <path d="M 0 0 L 405 0" v-if="div.number < divsMen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
              <text x="0" y="35" font-size="35" transform="translate(400,-300),rotate(-90)">{{divName(div)}}</text>
            </g>
            <g v-for="(boat, idx) in boatsMen" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`">
              <path :d="makeLine(boat)" fill="transparent" :style="`stroke:${boat.color};stroke-width:5;`" />
              <circle v-for="point in makePoints(boat)" :cx="point.x" :cy="point.y" r="5" :stroke="boat.color" stroke-width="3" :fill="boat.color" />
              <use v-bind:xlink:href="`#${boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified"></use>
              <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified" :transform="`translate(${curPoint(boat).x},${curPoint(boat).y})`"></use>
            </g>
          </g>
          <g id="containerWomen" transform="translate(225,3),scale(0.5)">
            <g v-for="div in divsWomen" :transform="`translate(0,${(((12 * div.number)  * (47.5 + 10)) -5)})`">
              <path d="M 0 0 L 405 0" v-if="div.number < divsWomen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
              <text x="0" y="35" font-size="35" transform="translate(400,-300),rotate(-90)">{{divName(div)}}</text>
            </g>
            <g v-for="(boat,idx) in boatsWomen" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`">
              <path :d="makeLine(boat)" fill="transparent" :style="`stroke:${boat.color};stroke-width:5;`" />
              <circle v-for="point in makePoints(boat)" :cx="point.x" :cy="point.y" r="5" :stroke="boat.color" stroke-width="3" :fill="boat.color" />
              <use v-bind:xlink:href="`#${boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified"></use>
              <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified" :transform="`translate(${curPoint(boat).x},${curPoint(boat).y})`"></use>
            </g>
          </g>
        </svg>
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
                    top
                    label="Day"
                    required
                    v-model="bumpDay"
                    :items="[1,2,3,4]"
                  ></v-select>
                </v-flex>
                <v-flex xs2 sm3 md3>
                  <v-select
                    label="Division"
                    required
                    attach
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
                <v-flex xs5 sm4 md4>
                  <v-tabs right v-model="bumpTab">
                    <v-tab v-for="n in ['Bump','Manual']" :key="n" value="a">{{ n }}</v-tab>
                  </v-tabs>
                </v-flex>
              </v-layout>
              <v-layout wrap v-show="bumpTab === '0'">
                <v-flex xs5 sm5 md5 :md8="bumpAction ==='row over'" :sm8="bumpAction ==='row over'" :xs8="bumpAction ==='row over'">
                  <v-select
                    v-show="bumpAction === 'row over'"
                    label="Boats"
                    item-text="short"
                    v-model="rowOvers"
                    required
                    attach
                    clearable
                    autocomplete
                    multiple
                    :items="rowOverBoats"
                  ></v-select>
                  <v-select
                    v-show="bumpAction === 'bumps'"
                    label="Boat"
                    attach
                    item-text="short"
                    v-model="bumpBoat"
                    required
                    autocomplete
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
                <v-flex xs4 sm4 md4>
                  <v-select
                    label="Boat"
                    v-show="bumpAction === 'bumps'"
                    item-text="short"
                    attach
                    v-model="bumpedBoat"
                    :required="bumpAction === 'bumps'"
                    autocomplete
                    :items="bumpedBoats"
                  ></v-select>
                </v-flex>
              </v-layout>
              <v-layout wrap v-show="bumpTab === '1'">
                <v-flex xs9 sm9 md9>
                  <v-select
                    label="Boat"
                    item-text="short"
                    v-model="bumpBoat"
                    required
                    attach
                    autocomplete
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
            <small class="pl-3 noselect">*indicates required field</small>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="bumpDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!verified" @click.native="submitBump()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </v-content>
    <v-footer app fixed>
      <v-btn class="menu-btn mt-2 ml-1 mr-1" color="primary" dark @click.native.stop="bumpDialog = !bumpDialog" v-if="verified">Bump</v-btn>
      <div class="pl-2 noselect">By <a href="http://www.wolfsonrowing.org/" target="_blank">Wolfson Boat Club</a></div>
      <v-spacer></v-spacer>
      <div class="noselect">Chris Vaas</div>
      <v-btn id="btn-github" flat icon href="https://github.com/AuspeXeu/oxford-rowing" target="_blank" small>
        <v-icon>fa-github</v-icon>
      </v-btn>
      <div class="noselect pr-2">© {{ new Date().getFullYear() }}</div>
    </v-footer>
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
import ReWebSocket from 'reconnectingwebsocket'
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
 
Vue.use(Vuetify)
export default {
  data() {
    return {
      boatsSelected: [],
      name: 'live',
      isLive: false,
      liveTimer: false,
      bumpAction: 'bumps',
      bumpedBoat: false,
      viewers: 0,
      reporters: 0,
      rowOvers: [],
      bumpBoat: false,
      event: false,
      auth: false,
      snack: {
        multi: false,
        visible: false,
        timeout: 3000,
        color: 'success',
        text: ''
      },
      verified: false,
      bumpGender: 'men',
      bumpMoves: 0,
      bumpDay: 1,
      bumpDivision: 1,
      bumpDialog: false,
      bumpTab: '0',
      points: {},
      boatsHigh: [],
      divs: false,
      events: [{year: 2018, name: 'Torpids'},{year: 2017, name: 'Eights'},{year: 2017, name: 'Torpids'}],
      chartData: {}
    }
  },
  beforeMount () {
    this.auth = this.$route.query.auth
    const socket = new ReWebSocket(`${window.location.origin.replace('http','ws')}/live`)
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
        const moves = parseInt(bump.moves, 10)
        if (this.event.year !== year || this.event.name.toLowerCase() !== name)
          return
        if (this.chartData[club][gender][number].moves.length >= day)
          Vue.set(this.chartData[club][gender][number].moves, day-1, moves)
        else
          this.chartData[club][gender][number].moves.push(moves)
        this.notify(`${this.clubToName(club)} M${this.romanize(number + 1)} moves ${moves}`, 'info')
      } else if (message.type === 'users') {
        if (this.reporters < message.reporters)
          this.notify(`A reporter is live`, 'info')
        this.reporters = message.reporters
        this.viewers = message.viewers
      }
    }
    socket.onopen = () => {
      if (this.auth)
        socket.send(JSON.stringify({type: 'reporter', auth: this.auth}))
    }
  },
  mounted() {
    this.bumpDay = this.curDay()
    this.loadData(this.events.sort((a,b) => `${b.year}${(b.name == 'Torpids' ? '0' : '1')}` > `${a.year}${(a.name == 'Torpids' ? '0' : '1')}`)[0])
  },
  watch: {
    bumpDay() {
      if (this.bumpDay < this.curDay() && !confirm('You are about to change a past division, do you know what you are doing?'))
        setTimeout(() => this.bumpDay = this.curDay(), 1)
      else if (this.bumpDay > this.curDay() && !confirm('You are about to change a future division, do you know what you are doing?'))
        setTimeout(() => this.bumpDay = this.curDay(), 1)
    },
    bumpBoat() {
      if (this.bumpBoat)
        this.bumpGender = this.bumpBoat.gender
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
      axios.get('/verify', {headers: {'authorization': this.auth}})
        .then(() => this.verified = true)
        .catch(() => this.verified = false)
    },
    boatsSelected() {
      this.boatsHigh.forEach((boat) => this.chartData[boat.club][boat.gender][boat.number].color = 'gray')
      this.boatsHigh = []
      this.boatsSelected.forEach((boat) => {
        this.chartData[boat.club][boat.gender][boat.number].color = 'orange'
        this.boatsHigh.push(boat)
      })
    }
  },
  computed: {
    divBoats() {
      const rows = (this.bumpGender === 'men' ? this.rowsMen : this.rowsWomen)
      let boats = (this.bumpGender === 'men' ? this.boatsMen : this.boatsWomen)
      if (this.bumpDivision !== 'all') {
        const start = Math.max(0, ((this.bumpDivision - 1) * 12)-1)
        const end = Math.min(rows, (this.bumpDivision * 12)+1)
        boats = boats.slice(start, end)
      }
      if (!this.bumpBoat || !boats.find((boat) => boat.short === this.bumpBoat.short))
        this.bumpBoat = boats[0]
      return boats
    },
    bumpBoats() {
      const rows = (this.bumpGender === 'men' ? this.rowsMen : this.rowsWomen)
      let boats = (this.bumpGender === 'men' ? this.boatsMen : this.boatsWomen)
      if (this.bumpDivision !== 'all') {
        const start = Math.max(0, ((this.bumpDivision - 1) * 12)-1)
        const end = Math.min(rows, (this.bumpDivision * 12)+1)
        boats = boats.slice(start, end)
      }
      boats = boats.filter((boat) => {
        if (this.event.name.toLowerCase() === 'torpids')
          if (isNaN(boat.moves[this.bumpDay-1]) || boat.moves[this.bumpDay-1] < 0)
            return true
          else
            return false
        else if (this.event.name.toLowerCase() === 'eights')
          if (isNaN(boat.moves[this.bumpDay-1]))
            return true
          else
            return false
      })
      if (!boats.find((boat) => boat.short === this.bumpBoat.short))
        this.bumpBoat = boats[0]
      return boats
    },
    rowOverBoats() {
      return this.bumpBoats.filter((boat) => isNaN(boat.moves[this.bumpDay-1]))
    },
    bumpedBoats() {
      if (!this.bumpBoat)
        return []
      let boats = this.bumpBoats.filter((boat) => boat.short !== this.bumpBoat.short)
      boats.forEach((boat) => boat.cur = this.curPos(boat, this.bumpDay))
      const cur = this.curPos(this.bumpBoat, this.bumpDay)
      boats = boats.filter((boat) => boat.cur < cur).sort((a,b) => b.cur-a.cur)
      this.bumpedBoat = boats[0]
      return boats
    },
    lblCrewSel() {
      return (this.boatsHigh.length > 1 ? 'Crews' : 'Crew')
    },
    boats() {
      let boats = []
      for (let key in this.chartData) {
        const club = this.chartData[key]
        boats = boats.concat(club.men).concat(club.women)
      }
      return boats
    },
    divsMen() {
      if (this.divs)
        return this.divs.men.map((time, idx) => ({time: time, number: idx + 1}))
      const ary = Array.from({length: Math.ceil(this.rowsMen / 12)}, (x,i) => i)
      ary.shift()
      return ary.map((itm, idx) => ({number: idx+1}))
    },
    divsWomen() {
      if (this.divs)
        return this.divs.women.map((time, idx) => ({time: time, number: idx + 1}))
      const ary = Array.from({length: Math.ceil(this.rowsWomen / 12)}, (x,i) => i)
      ary.shift()
      return ary.map((itm, idx) => ({number: idx+1}))
    },
    boatsMen() {
      let boats = []
      for (let key in this.chartData) {
        this.chartData[key].men.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].men)
      }
      return boats.sort((a,b) => a.start-b.start)
    },
    boatsWomen() {
      let boats = []
      for (let key in this.chartData) {
        this.chartData[key].women.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].women)
      }
      return boats.sort((a,b) => a.start-b.start)
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
    curDay() {
      return Math.max(Math.min(4, new Date().getDay() - 2), 1)
    },
    notify(text, type) {
      this.snack.text = text
      this.snack.color = type
      this.snack.multi = type === 'error'
      this.snack.visible = true
    },
    submitBump() {
      axios.post('/bump', {
        year: this.event.year,
        name: this.event.name,
        day: this.bumpDay,
        moves: this.bumpMoves,
        bumpBoat: this.bumpBoat,
        rowOvers: (this.bumpTab === '0' && this.bumpAction === 'row over' ? this.rowOvers : undefined),
        bumpedBoat: (this.bumpTab === '0' && this.bumpAction === 'bumps' ? this.bumpedBoat : undefined)
      }, {headers: {'authorization': this.auth}})
      .then((response) => this.notify('Bump submitted', 'success'))
      .catch((error) => this.notify('Failed to submit bump', 'error'))
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
      return `Division ${this.romanize(div.number)}${(div.time ? ` - ${div.time}` : '')}`
    },
    clubToName(club) {
      const table = {
        BAL: 'Balliol',BRC: 'Brasenose', CHB: 'Christ Church', COO: 'Corpus Christi', EXC: 'Exeter', GTM: 'Green Templeton', HEC: 'Hertford', JEO: 'Jesus', KEB: 'Keble', LMH: 'Lady Margaret', LIN: 'Linacre', LIC: 'Lincoln', MAG: 'Magdalen', MAN: 'Mansfield', MER: 'Merton', NEC: 'New College', ORO: 'Oriel', OSG: 'Osler House', PMB: 'Pembroke', QCO: `Queen's`, RPC: `Regent's`, SOM: 'Somerville', SAC: `Anne's`, SAY: `Antony's`, SBH: `Benet's`, SCO: `Catherine's`, SEH: `Teddy`, SHI: `Hilda's`, SHG: `Hugh's`, SJO: `John's`, SPC: `Peter's`, TRO: 'Trinity', UCO: 'Univ', WAD: 'Wadham', WOO: 'Wolfson', WRO: 'Worcester'
      }
      return table[club]
    },
    loadData(event) {
      axios.get(`./data/${event.name.toLowerCase()}_${event.year}.json`)
        .then((response) => {
          for (let key in response.data) {
            response.data[key].men = response.data[key].men.map((boat, idx) => {
              boat.club = key
              boat.gender = 'men'
              boat.number = idx
              boat.color = 'gray'
              boat.short = `${this.clubToName(boat.club)} M${this.romanize(boat.number + 1)}`
              return boat
            })
            response.data[key].women = response.data[key].women.map((boat, idx) => {
              boat.club = key
              boat.gender = 'women'
              boat.number = idx
              boat.short = `${this.clubToName(boat.club)} W${this.romanize(boat.number + 1)}`
              boat.color = 'gray'
              return boat
            })
            Vue.set(this.chartData, key, response.data[key])
          }
          this.bumpBoat = this.boats[0]
          this.event = event
        })
      axios.get(`./data/${event.name.toLowerCase()}_${event.year}_divs.json`)
        .then((response) => {
          this.divs = response.data
        })
        .catch(() => this.divs = false)
    },
    selectBoat(boat) {
      const divs = (boat.gender === 'men' ? this.divsMen : this.divsWomen)
      this.bumpDivision = Math.min(Math.ceil(boat.start / 12), divs.length)
      this.bumpBoat = boat
      this.boatsHigh.forEach((boat) => this.chartData[boat.club][boat.gender][boat.number].color = 'gray')
      this.boatsHigh = [boat]
      this.boatsSelected = [boat]
      this.chartData[boat.club][boat.gender][boat.number].color = 'orange'
    },
    curPos(boat, day) {
      return boat.moves.slice(0,day).reduce((acc, itm) => acc + itm, 0) * -1 + boat.start
    },
    curPoint(boat) {
      return {
        x: 90 * boat.moves.length,
        y: boat.moves.reduce((acc, itm) => acc + itm, 0) * (47.5 + 10) * -1
      }
    },
    makePoints(boat) {
      let cur = 24
      return boat.moves.slice(0, boat.moves.length-1).map((move, idx) => {
        cur += move * (47.5 + 10) * -1
        return {
          x: 95 * (idx+1),
          y: cur
        }
      })
    },
    makeLine(boat) {
      let line = 'M 23.75 23.75'
      let cur = 24
      boat.moves.forEach((move, idx) => {
        cur += move * (47.5 + 10) * -1
        line += ` L ${95 * (idx+1)} ${cur}`
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
body {
  background-color: #fafafa;
}
.live {
  color: red !important;
}
.menu-btn {
  height: 35px !important;
}
#btn-github {
  margin: 0px;
}
.custom-card {
  padding-bottom: 0px;
  padding-top: 0px;
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
