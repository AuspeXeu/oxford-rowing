<template>
<div id="app">
  <v-app>
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
        ></v-autocomplete>
      </v-flex>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout row v-resize="onResize">
          <v-flex id="svg-container" xs12 md10 sm10 offset-sm1 offset-md2 offset-lg3 offset-xl4>
            <svg width="100%" :height="(Math.max(rowsMen, rowsWomen) + (verified ? boatsPerDiv : 0)) * 38 * scale / 0.64">
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
                  <title>University</title>
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
                  <title>Balliol</title>
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
                  <title>Somerville</title>
                </g>
                <g id="SJO" transform="scale(0.5)">
                  <title>St Johns</title>
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
                  <title>St Hildas</title>
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
                  <title>St Hughs</title>
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
                  <title>CatZ</title>
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
                  <title>Benets</title>
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
                  <title>St Antonys</title>
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
                  <title>Regents</title>
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
                  <title>Queens</title>
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
                  <title>Pembroke</title>
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
                  <title>Osler</title>
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
                  <title>Oriel</title>
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
                  <title>New</title>
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
                  <title>Merton</title>
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
                  <title>Mansfield</title>
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
                  <title>Magdalen</title>
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
                  <title>LMH</title>
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
                  <title>Linacre</title>
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
                  <title>Lincoln</title>
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
                  <title>Green Templeton</title>
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
                  <title>Exceter</title>
                  <circle
                     style="opacity:1;fill:#c30b0b;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     cx="48"
                     cy="48.000004"
                     r="47.5" />
                </g>
                <g id="COO" transform="scale(0.5)">
                  <title>Corpus</title>
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
                  <title>Christ Church</title>
                  <circle
                     style="opacity:1;fill:#12266e;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     cx="48"
                     cy="48"
                     r="47.5"/>
                </g>
                <g id="BRC" transform="scale(0.5)">
                  <title>Brasenose</title>
                  <circle
                     style="opacity:1;fill:#000102;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     cx="48"
                     cy="48"
                     r="47.5"/>
                </g>
                <g id="KEB" transform="scale(0.5)">
                  <title>Keble</title>
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
                  <title>Jesus</title>
                  <circle
                     style="opacity:1;fill:#0e922b;fill-opacity:1;stroke:#fff;stroke-width:7;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     cx="48"
                     cy="48.000004"
                     r="47.5" />
                </g>
                <g id="HEC" transform="scale(0.5)">
                  <title>Hertford</title>
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
                  <title>St Annes</title>
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
                  <title>Teddy Hall</title>
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
                <g id="DDR" transform="scale(0.03)">
                  <path
     d="M 1351.0111,228.28503 A 520.00061,570.51495 0 1 1 311.00989,228.28503 A 520.00061,570.51495 0 1 1 1351.0111,228.28503 z"
     transform="matrix(1.0912344,0,0,1.0056705,-93.129746,593.09453)"
     id="path11866"
     style="fill:#dd0000;fill-opacity:1;stroke:#000000;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0" />
  <g
     transform="matrix(1.000224,0,0,1.000478,-896.77553,-869.78977)"
     id="g2219">
    <use
       transform="matrix(-1,0,0,1,3344.188,-55.39965)"
       id="use3755"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="matrix(-1,0,0,1,3362.762,-41.47837)"
       id="use3753"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="matrix(-1,0,0,1,3381.317,-27.62595)"
       id="use3751"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="matrix(-1,0,0,1,3399.832,-13.72483)"
       id="use3749"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="matrix(-1,0,0,1,3418.376,0.166189)"
       id="use3747"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="translate(74.6188,-55.50708)"
       id="use2229"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="translate(55.83946,-41.54721)"
       id="use2227"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="translate(37.06012,-27.58735)"
       id="use2225"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <use
       transform="translate(18.4746,-13.76497)"
       id="use2222"
       x="0"
       y="0"
       width="744.09448"
       height="1052.3622"
       xlink:href="#path1459" />
    <path
       d="M 1605.6754,2445.3135 L 1781.1934,2528.2887 L 1799.7386,2514.3686 L 1634.9834,2436.6794 L 1605.6754,2445.3135 z"
       id="path1459"
       style="opacity:1;fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:6.25000000000000000;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  </g>
  <g
     transform="matrix(1.000224,0,0,1.000478,-896.77553,-869.78977)"
     id="g1991">
    <path
       d="M 1718.0294,1214.375 L 1468.4987,1227.7812 L 1468.4987,1294.375 L 1468.4987,1308.1875 L 1468.4987,1374.7812 L 1718.0294,1388.1875 L 1745.0606,1388.1875 L 1953.1227,1357.625 L 1953.1227,1308.1875 L 1953.1227,1294.375 L 1953.1227,1244.9375 L 1745.0606,1214.375 L 1718.0294,1214.375 z"
       id="rect2939"
       style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:12.49999905;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:5;stroke-dashoffset:0;stroke-opacity:1" />
    <rect
       width="129.76305"
       height="734.84949"
       rx="21.86587"
       ry="21.86587"
       x="1644.4601"
       y="1464.9532"
       id="rect15740"
       style="fill:#ffc709;fill-opacity:1;stroke:#000000;stroke-width:13.74999905;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       d="M 2002.8726,1700.0938 C 1929.1246,1776.2422 1825.8902,1823.6562 1711.592,1823.6562 C 1629.8803,1823.6562 1553.8426,1799.3724 1490.1549,1757.75 L 1438.2488,1834.4688 C 1516.7519,1886.1322 1610.6507,1916.2812 1711.592,1916.2812 C 1851.6837,1916.2812 1978.2598,1858.2742 2068.81,1765.0938 L 2002.8726,1700.0938 z"
       id="path2826"
       style="fill:#ffc709;fill-opacity:1;stroke:#000000;stroke-width:13.74999905;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       d="M 1662.7483,1371.5 L 1305.3428,2031.6562 L 1709.9357,1509.5312 L 2114.5599,2031.6562 L 1757.1856,1371.5 L 1662.7483,1371.5 z"
       id="path1305"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:13.74999905;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
    <path
       d="M 1717.5958,1221.3535 L 1546.192,1229.5678 L 1475.0119,1258.1393 L 1475.0119,1344.4231 L 1545.2616,1372.9946 L 1717.5958,1382.1395 L 1743.8745,1382.1395 L 1946.1442,1352.4719 L 1946.1442,1308.1351 L 1946.1442,1295.3578 L 1946.1442,1249.6254 L 1743.8745,1221.3535 L 1717.5958,1221.3535 z"
       id="path2072"
       style="fill:#ffc709;fill-opacity:1;stroke:#00ca00;stroke-width:0;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:5;stroke-dashoffset:0;stroke-opacity:1" />
    <rect
       width="118.79286"
       height="121.74438"
       rx="59.396549"
       ry="59.396549"
       x="1649.8993"
       y="1351.8645"
       id="rect8156"
       style="fill:#ffc709;fill-opacity:1;stroke:#000000;stroke-width:17.71711159;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:5;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       d="M 1734.846,1412.9161 A 26.518162,26.518162 0 1 1 1681.8097,1412.9161 A 26.518162,26.518162 0 1 1 1734.846,1412.9161 z"
       transform="matrix(0.948831,0,0,0.948729,88.46034,71.26418)"
       id="path13464"
       style="fill:#ffc709;fill-opacity:1;stroke:#000000;stroke-width:6.25000572;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
  </g>
  <g
     transform="matrix(1.000224,0,0,1.000478,-896.77553,-869.78977)"
     id="g10675">
    <path
       d="M 1247.3526,2299.7148 L 1022.7567,2048.5538 L 934.60883,1733.395 L 966.00396,1442.3863 L 1109.6971,1163.4526 L 1331.878,991.98693 L 1464.7035,942.47923 L 1502.1362,996.81695 L 1567.3414,1016.137 L 1529.9088,1047.5322 L 1525.0788,1128.435 L 1298.0678,1276.9581 L 1160.4123,1506.384 L 1147.1297,1764.7901 L 1215.9575,1989.386 L 1479.1936,2240.5471 L 1247.3526,2299.7148 z"
       id="path2946"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <g
       id="g27242">
      <use
         transform="matrix(0.999456,-3.2981e-2,3.298088e-2,0.999456,-82.2208,115.8993)"
         id="use8212"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660" />
      <use
         transform="matrix(0.99935,-3.605805e-2,3.605791e-2,0.99935,-151.9702,83.45806)"
         id="use8978"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path8216" />
      <use
         transform="translate(-120.2254,6.373583)"
         id="use8976"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path8216" />
      <use
         transform="matrix(0.9998,-1.997304e-2,1.997296e-2,0.9998,-84.54348,89.98236)"
         id="use6694"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660"
         style="fill:#ff6600" />
      <use
         transform="matrix(0.885908,1.766287e-4,-1.968885e-4,0.987657,147.2906,-0.54859)"
         id="use8990"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660" />
      <use
         transform="translate(56.08591,-19.55353)"
         id="use8994"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660" />
      <use
         transform="translate(-25.2257,-14.84422)"
         id="use8992"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path8216" />
      <use
         transform="matrix(0.998145,-6.08806e-2,6.088038e-2,0.998145,-49.46301,100.4263)"
         id="use8980"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path8216" />
      <use
         transform="matrix(0.999541,-3.026764e-2,3.026752e-2,0.999541,80.70093,100.7888)"
         id="use8982"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660" />
      <use
         transform="translate(23.90821,16.69647)"
         id="use8998"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660" />
      <path
         d="M 991.04165,1855.7068 C 991.04165,1855.7068 999.85769,1884.7005 1021.2496,1919.7045 C 1044.9877,1956.1162 1062.4995,1954.5507 1062.4995,1954.5507 C 1062.4995,1954.5507 1089.1133,1959.3969 1092.8672,1938.6083 C 1094.2749,1917.8196 1080.1978,1910.3314 1080.1978,1909.8622 C 1080.1978,1910.3314 1064.8418,1898.5885 1045.0035,1889.7045 C 1027.9807,1878.4743 1029.0729,1878.6998 1019.2188,1865.0917 C 1013.1186,1849.6067 1014.9996,1860.3899 999.99963,1799.8622 C 984.99966,1739.3345 978.74572,1705.6351 978.27648,1705.6351 L 956.78695,1709.8543 L 976.24968,1797.9899 L 983.06453,1828.0215 L 991.04165,1855.7068 z"
         id="path3660"
         style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8000;stroke-width:6.24999952000000030;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1" />
      <path
         d="M 1049.2277,1688.6562 L 1090.0519,1845.643 C 1090.0519,1845.643 1094.9391,1862.699 1097.6571,1880.1075 C 1097.0904,1900.8007 1093.1224,1908.9237 1093.1224,1908.9237 C 1092.6532,1908.9237 1090.521,1919.8661 1089.1133,1931.1161 C 1088.1748,1946.5893 1094.6879,1957.3622 1094.6879,1956.893 C 1094.6879,1957.3622 1099.6839,1965.1737 1114.8456,1966.5814 C 1132.3535,1966.1122 1134.9994,1953.6122 1134.9994,1953.6122 C 1134.9994,1953.6122 1137.7028,1952.3622 1136.9761,1934.8622 C 1136.2494,1917.3622 1127.4994,1889.8622 1127.4994,1889.8622 L 1068.7495,1677.8636 L 1049.2277,1688.6562 z"
         id="path8216"
         style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:6.24999952000000030;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1" />
      <use
         transform="matrix(0.997245,-7.417704e-2,7.417692e-2,0.997245,28.72989,156.3117)"
         id="use8988"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path3660" />
      <path
         d="M 1130.6244,1752.8215 L 1186.7173,1902.7467 C 1186.7173,1902.7467 1193.2609,1918.9718 1197.6822,1935.8521 C 1199.1615,1956.4524 1196.0177,1965.0667 1196.0177,1965.0667 C 1195.5511,1965.1327 1194.5111,1976.2843 1194.2219,1987.6387 C 1194.8162,2003.1151 1202.3563,2012.8804 1202.31,2012.4151 C 1202.3563,2012.8804 1208.0954,2019.9228 1223.3111,2019.1827 C 1240.6743,2016.2506 1242.0713,2003.4822 1242.0713,2003.4822 C 1242.0713,2003.4822 1244.6362,1986.846 1239.8398,1970.5328 C 1235.9819,1949.9965 1199.2271,1882.6654 1184.6805,1837.1488 L 1152.2558,1737.9608 L 1130.6244,1752.8215 z"
         id="use8984"
         style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:6.25000095000000040;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1" />
    </g>
    <g
       id="g27290">
      <use
         transform="translate(35.03599,6.845677)"
         id="use5966"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1399" />
      <use
         transform="translate(19.3666,-0.654323)"
         id="use5964"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1399" />
      <use
         transform="matrix(0.99154,0.129804,-0.129804,0.99154,310.7798,-167.8081)"
         id="use5968"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1399" />
      <use
         transform="matrix(0.989267,-0.14612,0.14612,0.989267,-295.5019,158.9123)"
         id="use5962"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path5202" />
      <path
         d="M 1072.6899,1170.1423 C 1072.6899,1170.1423 1051.6113,1193.9866 1022.4996,1242.3622 C 994.32635,1289.7993 993.13057,1291.7392 979.99967,1327.3622 C 970.62272,1362.0467 970.53499,1373.7699 977.03438,1393.143 C 985.41074,1408.762 993.61155,1412.0504 1001.2496,1412.3622 C 1008.8924,1412.6742 1012.8151,1410.5805 1018.4341,1401.9485 C 1029.6841,1376.4237 1015.5033,1363.6122 1011.2496,1342.3622 C 1006.9959,1321.1122 1008.7575,1337.4455 1008.7496,1321.7079 C 1011.0879,1300.8086 1017.6534,1295.3354 1020.4688,1289.7045 C 1024.692,1281.7273 1027.6653,1275.722 1051.2495,1240.5288 C 1075.7724,1202.9894 1087.4995,1182.3622 1087.4995,1182.3622 C 1087.4995,1182.3622 1090.0852,1173.9732 1084.4209,1169.8622 C 1078.988,1165.9191 1072.6899,1170.1423 1072.6899,1170.1423 z"
         id="path1399"
         style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8100;stroke-width:6.24999952000000030;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
      <use
         transform="translate(-22.62156,-33.45269)"
         id="use5972"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path5202" />
      <use
         transform="matrix(0.993134,0.116981,-0.116981,0.993134,309.1862,-143.5774)"
         id="use2920"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1399" />
      <use
         transform="translate(-5.051164,-25.44072)"
         id="use5970"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path5202" />
      <use
         transform="matrix(0.992655,0.120979,-0.120979,0.992655,276.319,-169.5983)"
         id="use2918"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1399" />
      <path
         d="M 1286.6644,1173.427 C 1286.6644,1173.427 1240.6052,1228.6122 1223.7492,1249.8622 C 1203.6085,1272.9892 1183.3223,1306.8851 1166.2493,1323.9237 C 1146.3609,1339.5546 1128.7533,1340.016 1114.9994,1349.8622 C 1099.3685,1360.1777 1095.9379,1365.7967 1093.7494,1376.1122 C 1092.0302,1390.1816 1104.2767,1402.3622 1118.7494,1399.8622 C 1132.7529,1400.1777 1151.2493,1380.3633 1151.2493,1380.3633 C 1151.2493,1380.3633 1176.3991,1346.0094 1193.7492,1322.3622 C 1232.2153,1265.8679 1304.4956,1184.8622 1304.4956,1184.8622 L 1286.6644,1173.427 z"
         id="path5202"
         style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:6.24999952000000030;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
      <use
         transform="matrix(1.105681,-4.354951e-2,5.267582e-2,1.047619,-211.8254,44.91779)"
         id="use5976"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path5202" />
      <use
         transform="matrix(0.998663,5.168639e-2,-5.168621e-2,0.998663,30.62677,-74.48307)"
         id="use4442"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path2922" />
      <use
         transform="matrix(1.124942,-0.124979,0.142751,0.991863,-325.2479,250.8697)"
         id="use5980"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path5202" />
      <path
         d="M 1324.2038,1275.2528 C 1324.2038,1275.2528 1317.9748,1283.6161 1265.5485,1358.6122 C 1218.2839,1440.1777 1211.2492,1455.4422 1211.2492,1455.4422 C 1211.2492,1455.4422 1203.7634,1471.1122 1195.6313,1476.1122 C 1187.4993,1481.1122 1173.2071,1481.3508 1168.7493,1478.3007 C 1164.4981,1475.392 1162.1878,1475.0239 1159.9993,1459.8622 C 1161.0955,1450.8007 1163.5265,1447.0834 1167.0876,1443.5223 C 1174.3861,1437.3735 1178.2216,1436.2082 1187.3971,1432.7621 C 1196.3696,1427.5031 1199.6785,1422.7135 1205.5118,1413.846 C 1216.9182,1393.637 1221.9662,1383.7841 1241.3496,1354.1902 C 1266.4363,1315.1112 1286.5067,1291.0479 1309.6835,1260.237 L 1324.2038,1275.2528 z"
         id="path2922"
         style="opacity:1;fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:6.24999952000000030;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
    </g>
    <g
       id="g27306">
      <path
         d="M 1627.1562,871.96875 C 1555.1174,879.55754 1485.8408,896.47265 1420.625,921.625 L 1426.1875,932.78125 C 1491.3382,907.78589 1559.7759,891.45655 1629.1562,884.09375 C 1635.198,883.40631 1633.8605,871.3145 1627.1562,871.96875 z"
         id="path2939"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:5.13780068999999970;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1668.8125,891.21875 C 1602.6508,894.64691 1549.3217,904.74487 1494.2188,920.84375 C 1472.8023,926.98907 1451.675,934.10477 1430.875,942.09375 L 1436.5312,953.40625 C 1511.1712,925.01773 1590.1737,908.18779 1669.9062,903.65625 C 1677.2563,902.86464 1676.2209,891.33952 1668.8125,891.21875 z"
         id="path4497"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1638.1875,916.40625 C 1570.9104,923.24624 1504.4547,938.72374 1441.1875,962.65625 L 1445.9375,972.15625 C 1508.2458,948.71371 1573.6862,933.57951 1639.9062,926.78125 C 1646.0417,926.34172 1644.798,915.83952 1638.1875,916.40625 z"
         id="path4523"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1449.6875,979.65625 L 1455.3125,990.875 C 1544.2747,958.49361 1623.5575,946.08311 1691.7188,944.0625 C 1698.7856,943.62715 1698.8084,932.12285 1690.7812,931.6875 C 1613.3568,934.3731 1524.2886,951.65588 1449.6875,979.65625 z"
         id="path4553"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1654.6875,956.0625 C 1595.4238,960.96391 1528.7357,974.90334 1460,1000.25 L 1465.75,1011.7188 C 1524.8636,989.82954 1604.0619,972.27154 1656.8438,968.375 C 1664.1752,967.28963 1662.4501,955.47075 1654.6875,956.0625 z"
         id="path4576"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1471.375,1022.9062 L 1476.9688,1034.0938 C 1537.1448,1012.0047 1635.9461,991.09577 1693.3125,992.0625 C 1699.5084,991.57506 1698.9959,980.01869 1692.7812,979.53125 C 1620.8404,979.4947 1545.6271,995.97068 1471.375,1022.9062 z"
         id="path4611"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1648.125,1006.2188 C 1591.7267,1012.673 1535.9853,1025.787 1482.5938,1045.3125 L 1488.1875,1056.4688 C 1538.4645,1038.3051 1593.9684,1024.2968 1649.5625,1018.75 C 1657.8043,1017.5917 1656.6543,1005.7 1648.125,1006.2188 z"
         id="path4640"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1493.75,1067.5938 L 1499.375,1078.7812 C 1548.621,1061.1178 1626.427,1044.6522 1679.375,1041.9062 C 1687.071,1041.0313 1686.046,1029.4229 1678.3125,1029.2188 C 1616.3282,1031.5737 1548.7855,1048.2941 1493.75,1067.5938 z"
         id="path4671"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1683.9062,1056.2188 C 1638,1056.5661 1557.5671,1073.4782 1505.9375,1091.875 L 1511.5625,1103.0938 C 1560.9146,1085.6304 1642.215,1069.559 1684.5,1068.5625 C 1693.023,1068.473 1692.8251,1056.3083 1683.9062,1056.2188 z"
         id="path4700"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1644.75,1085.25 C 1601.7034,1091.3832 1559.1555,1101.7015 1518.0938,1116.1562 L 1523.6875,1127.3125 C 1562.9036,1113.101 1606.6017,1102.613 1647.3438,1097.2812 C 1655.2002,1095.6188 1653.3293,1083.5582 1644.75,1085.25 z"
         id="path4730"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <path
         d="M 1682.3125,1105.8125 C 1634.8929,1107.5103 1572.9732,1121.4544 1528.5312,1137 L 1534.1562,1148.2188 C 1575.5861,1133.9226 1634.7346,1120.0441 1682.5,1118.3125 C 1691.1585,1117.8355 1690.4251,1105.2833 1682.3125,1105.8125 z"
         id="path4762"
         style="opacity:1;fill:#ffc709;fill-opacity:1;stroke:#dc8200;stroke-width:4.99999952000000030;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dashoffset:0;stroke-opacity:1" />
      <use
         transform="matrix(-0.342847,0.886674,-0.904743,-0.333954,3477.79,854.2747)"
         id="use4450"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.615062,-0.668952,-0.683653,0.601574,3316.868,691.1588)"
         id="use2130"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(8.304219e-2,0.913807,-0.907373,8.363065e-2,3016.55,99.30195)"
         id="use4466"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.533441,-0.689356,-0.688213,0.541052,3192.195,841.3906)"
         id="use2128"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.189801,0.877093,-0.877887,0.18963,2808.218,-31.80175)"
         id="use4458"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.491088,-0.685334,-0.654357,0.547119,3044.978,852.3477)"
         id="use2126"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.365788,0.780433,-0.81444,0.350514,2481.48,-198.4304)"
         id="use4460"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.637479,-0.598106,-0.600157,0.652774,3042.67,610.8642)"
         id="use4452"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.670169,-0.481205,-0.484993,0.675247,2829.417,493.6649)"
         id="use4454"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.371327,0.757728,-0.796697,0.353163,2397.734,-146.0319)"
         id="use4462"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.462503,0.718011,-0.743383,0.446716,2175.161,-239.825)"
         id="use4464"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.675899,-0.537329,-0.484671,0.733345,2793.343,479.0532)"
         id="use4456"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.346087,1.021902,-0.994942,-0.353338,3562.619,617.2993)"
         id="use4468"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.275637,0.986972,-1.002316,0.27076,2925.568,-443.5212)"
         id="use4470"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.329018,1.059671,-1.033348,0.338851,2874.447,-601.9771)"
         id="use4472"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.39445,1.004511,-0.974629,0.406765,2654.295,-641.5226)"
         id="use4474"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.528696,0.875115,-0.892902,0.510815,2329.721,-667.5531)"
         id="use4476"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.552781,0.868704,-0.871656,0.549752,2224.343,-695.5079)"
         id="use4478"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.545686,0.870302,-0.876076,0.539066,2193.914,-646.0939)"
         id="use4480"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.643061,0.795139,-0.79481,0.643513,1918.417,-719.2436)"
         id="use4482"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.902135,-0.482109,-0.475963,0.913779,3261.291,-164.2933)"
         id="use2142"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.151193,1.075858,-0.988502,-0.164554,3427.625,265.658)"
         id="use2124"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.625152,-0.862987,-0.861421,0.626287,3629.281,738.9606)"
         id="use2140"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.113216,1.053721,-1.06774,0.11173,3255.83,-187.4381)"
         id="use2122"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.64277,-0.895285,-0.859861,0.669248,3573.671,714.9177)"
         id="use2138"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.631151,-0.811448,-0.802611,0.638099,3401.265,725.6758)"
         id="use2136"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.24308,1.150042,-1.130545,0.24727,3178.236,-491.238)"
         id="use2120"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.419876,0.997844,-1.022915,0.409583,2755.035,-595.9101)"
         id="use2114"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.700727,-0.749749,-0.713428,0.736399,3252.822,527.5531)"
         id="use2134"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.517898,0.962634,-0.976809,0.51038,2521.404,-702.4952)"
         id="use2116"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.555081,0.880115,-0.892784,0.547202,2286.381,-655.2489)"
         id="use2118"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.843489,-0.630462,-0.636168,0.83592,3196.744,280.2743)"
         id="use2132"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
    </g>
    <g
       id="g27219">
      <use
         transform="matrix(1.026081,-0.527627,0.573085,0.906582,-861.6593,1048.425)"
         id="use1374"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.996965,-0.642688,0.649062,0.987173,-930.8159,1060.041)"
         id="use1372"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.814561,-0.580079,0.580077,0.814561,-592.2413,1352.839)"
         id="use1370"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.637932,0.770093,0.770091,0.637932,447.7431,256.1363)"
         id="use2900"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.970044,-0.372861,0.368591,0.981276,-359.4397,775.603)"
         id="use1376"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334"
         style="opacity:1" />
      <use
         transform="matrix(0.872203,-0.489146,0.489144,0.872203,-387.2204,1051.731)"
         id="use1396"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.581951,0.85154,0.843282,0.587647,306.333,315.2726)"
         id="use1384"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.883684,-0.559739,0.565062,0.875355,-583.406,1190.914)"
         id="use1378"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.464239,0.834706,0.805115,0.520544,355.4233,408.478)"
         id="use1392"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.800577,-0.522018,0.522596,0.80015,-338.1829,1241.306)"
         id="use1394"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.50844,0.750546,0.761006,0.494134,518.2056,565.6206)"
         id="use1388"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.755672,-0.654952,0.65495,0.755672,-495.3443,1475.821)"
         id="use1390"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.485631,0.916794,0.918665,0.48464,131.5668,481.1247)"
         id="use1382"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.47861,0.878029,0.878025,0.47861,246.4011,569.1745)"
         id="use1380"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.600145,0.799893,0.799891,0.600145,577.9245,381.3682)"
         id="use1386"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
    </g>
    <g
       id="g27258">
      <use
         transform="matrix(0.935721,0.488544,-0.496699,0.916247,983.9212,-666.3682)"
         id="use1342"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.980452,0.422405,-0.427922,0.95725,802.4647,-617.1123)"
         id="use1340"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.065277,0.358136,-0.386028,0.965959,635.7466,-512.6684)"
         id="use1338"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.034188,0.279432,-0.273374,1.068487,457.0037,-558.3204)"
         id="use5890"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.049426,0.230155,-0.235513,1.025168,370.9369,-374.8913)"
         id="use5888"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.803898,0.781848,-0.836225,0.751203,1803.706,-700.1667)"
         id="use2123"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-1.041525,-0.175479,-0.17684,1.032943,2387.776,-249.4307)"
         id="use2121"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.880039,0.611241,-0.626969,0.857484,1323.951,-663.1332)"
         id="use2119"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.720278,0.609835,-0.708024,0.691606,1725.51,-343.7461)"
         id="use3630"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.839499,-0.140959,-0.128995,0.89646,2187.226,36.14228)"
         id="use3628"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.742301,0.470879,-0.500929,0.793447,1313.941,-339.0369)"
         id="use3626"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-1.023452,-0.128865,-0.128381,1.033841,2266.341,-233.7415)"
         id="use2117"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.02832,0.467983,-0.47623,1.009946,896.6814,-729.9796)"
         id="use2115"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.870032,-3.643122e-2,-3.642634e-2,0.853264,2036.286,66.66707)"
         id="use3624"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.791858,0.388611,-0.446855,0.757136,1159.631,-141.3732)"
         id="use3622"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-1.058907,5.105063e-2,5.195064e-2,1.05255,1963.583,-373.0458)"
         id="use2113"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.011791,0.362802,-0.337656,1.086531,649.4917,-700.9716)"
         id="use2111"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.873065,1.354367e-2,1.143627e-2,0.926846,1945.742,-61.60909)"
         id="use3620"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.820777,0.327547,-0.366336,0.805681,982.1377,-111.3936)"
         id="use3618"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-1.037813,0.123406,0.122709,1.040759,1808.458,-354.4088)"
         id="use2109"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.052907,0.182933,-0.175351,1.097822,319.0755,-485.403)"
         id="use2107"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.047843,0.130472,-0.129238,1.057852,181.2178,-283.9914)"
         id="use5126"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.890144,0.162781,0.159546,0.870934,1693.077,-46.41922)"
         id="use3616"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.942223,0.196016,-0.250442,0.905608,659.6853,-102.9433)"
         id="use3614"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-1.016537,0.210251,0.201957,1.042059,1647.379,-377.1752)"
         id="use2105"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(1.029275,7.198404e-2,-6.96393e-2,1.063337,148.8458,-258.281)"
         id="use1344"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.865149,0.244757,0.252951,0.861733,1505.641,-51.74182)"
         id="use3612"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(0.839748,0.13523,-0.166841,0.915057,608.985,-5.916645)"
         id="use3610"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <use
         transform="matrix(-0.867774,0.211451,0.272755,0.834455,1476.512,77.49399)"
         id="use3608"
         x="0"
         y="0"
         width="744.09448"
         height="1052.3622"
         xlink:href="#path1334" />
      <path
         d="M 900.42771,1739.5376 C 900.42771,1739.5376 915.88898,1843.3644 968.49505,1816.6208 C 1004.4074,1774.6859 900.42771,1739.5376 900.42771,1739.5376 z"
         id="path1334"
         style="opacity:1;fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:6.28879594999999990;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1" />
    </g>
    <g
       id="g10284">
      <path
         d="M 1100.3751,1955.6557 C 1100.3751,1955.6557 1041.6251,1956.3873 1002.4409,1943.9641 C 950.99782,1929.8986 930.50938,1882.3622 930.50938,1882.3622 C 930.50938,1882.3622 922.96903,1893.2464 923.43827,1908.7314 C 923.90751,1922.8087 933.96565,1955.3038 959.21895,1989.7045 C 985.41075,2032.0823 1003.2391,2082.0467 1024.3579,2114.8622 C 1041.2534,2144.393 1076.913,2171.1122 1076.913,2171.1122 C 1076.913,2171.1122 1190.3877,2157.5477 1201.3665,2155.2015 C 1215.9821,2152.9725 1316.249,2129.8622 1338.749,2128.6122 C 1361.2489,2127.3622 1412.3411,2130.643 1412.3411,2130.643 C 1412.3411,2130.643 1394.3555,2097.516 1385.6746,2091.1122 C 1368.3126,2076.7313 1347.3281,2070.8667 1325.6115,2049.8622 C 1313.749,2036.8348 1293.749,2013.7699 1282.4991,2001.2699 C 1268.4336,1987.8314 1257.8145,1974.5959 1242.4991,1965.979 C 1229.9992,1957.8314 1100.3751,1955.6557 1100.3751,1955.6557 z"
         id="path18882"
         style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:3.12499976000000010;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
      <path
         d="M 1356.854,2074.4961 C 1356.854,2074.4961 1315.1425,2075.5571 1295.0618,2078.1293 C 1272.8694,2081.6433 1225.169,2087.4092 1186.8745,2091.3301 C 1152.4713,2095.1298 1123.3268,2097.3476 1084.4997,2097.758 L 1013.98,2094.5324 C 1016.2308,2098.7158 1022.5124,2109.9869 1028.7498,2118.9545 C 1036.2497,2130.4436 1042.1478,2138.0908 1055.8747,2150.8745 C 1067.1382,2161.5396 1074.0941,2167.083 1077.3204,2169.5548 C 1085.7667,2168.6132 1139.118,2162.2182 1160.6557,2159.2387 C 1196.0949,2155.7888 1214.0777,2151.0453 1254.882,2142.4008 C 1276.2128,2138.0525 1325.6514,2127.6487 1338.5146,2126.9425 C 1353.0201,2125.7653 1404.6028,2128.486 1409.9991,2128.957 C 1406.5971,2123.366 1402.5552,2116.6787 1396.9053,2107.1647 C 1388.9094,2093.6486 1382.7177,2090.1701 1371.4679,2082.6446 C 1367.0146,2079.7423 1357.2192,2074.6454 1356.854,2074.4961 z"
         id="path24965"
         style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         d="M 972.03317,2008.7806 C 975.31788,2014.8807 983.98446,2032.3583 991.71907,2047.9892 C 1001.6222,2069.4051 1007.08,2081.0775 1014.3131,2095.1311 C 1030.0328,2096.3043 1045.3711,2096.7529 1084.5135,2098.0029 C 1123.3406,2097.5939 1152.4634,2095.3684 1186.8666,2091.5814 C 1225.1611,2087.6737 1272.8838,2081.9433 1295.0762,2078.4412 C 1315.1569,2075.8776 1357.4992,2074.8622 1357.4992,2074.8622 C 1357.4992,2074.8622 1338.6905,2063.4949 1329.9405,2055.9949 C 1319.0789,2045.9141 1314.0907,2038.7191 1305.2339,2029.393 C 1293.7375,2028.4545 1277.7339,2028.3776 1260.2339,2027.1276 C 1229.5952,2025.4083 1182.4995,2028.6122 1156.2495,2028.6122 C 1129.9996,2028.6122 1085.6227,2027.7153 1048.1996,2023.3615 C 997.40319,2019.7117 985.17197,2011.3614 972.03317,2008.7806 z"
         id="path22689"
         style="fill:#dd0000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
      <path
         d="M 929.72968,1892.8915 C 937.50939,1904.9341 945.34203,1917.2043 957.86456,1927.4207 C 979.11177,1942.5918 984.58867,1945.6046 1025.644,1955.2358 C 1062.6349,1961.0929 1070.9635,1959.4721 1120.2795,1960.9907 C 1168.3423,1962.4708 1182.2258,1963.5909 1213.3164,1966.1061 C 1228.3469,1967.3221 1233.3785,1968.5839 1239.8527,1969.623"
         id="path7663"
         style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    </g>
  </g>
  <use
     transform="matrix(-1,0,0,1,1627.9996,0)"
     id="use10804"
     x="0"
     y="0"
     width="744.09448"
     height="1052.3622"
     xlink:href="#g10675" />
  <g
     transform="matrix(1.000224,0,0,1.000478,-896.77553,-869.78977)"
     id="g4443">
    <path
       d="M 1509.375,2175.7812 C 1502.5213,2175.8378 1495.2188,2176.7884 1488.1562,2178.0312 C 1441.0716,2186.1922 1405.5943,2213.7899 1288.2812,2241.5312 C 1247.8731,2252.6001 1206.5618,2256.2199 1158.8438,2253.8438 C 1155.317,2252.8579 1152.4935,2248.8994 1152.4375,2244.75 L 1140.9375,2238.1875 C 1135.9055,2245.9607 1138.9746,2253.9148 1140.7812,2258.75 C 1142.2692,2262.7325 1144.6425,2267.2378 1148.1562,2270.0312 C 1232.9683,2330.4211 1235.1534,2343.4067 1283.9375,2389.4375 C 1310.8352,2415.9532 1318.9452,2424.3364 1408.5,2410.125 C 1426.1658,2438.7752 1429.9851,2453.7244 1480.9375,2438.9062 L 1489.5,2460.375 C 1497.4247,2475.1723 1508.2813,2475.3982 1535.8438,2469.5312 C 1607.2241,2454.1763 1627.8713,2436.7721 1709.375,2434.9688 C 1790.9066,2436.7681 1811.5474,2454.1742 1882.9375,2469.5312 C 1910.4999,2475.3982 1921.3565,2475.1723 1929.2812,2460.375 L 1937.8438,2438.9062 C 1988.7963,2453.7244 1992.6155,2438.7752 2010.2812,2410.125 C 2099.8361,2424.3364 2107.946,2415.9532 2134.8438,2389.4375 C 2183.6278,2343.4067 2185.813,2330.4211 2270.625,2270.0312 C 2274.1388,2267.2378 2276.4809,2262.7325 2277.9688,2258.75 C 2279.7753,2253.9148 2282.8758,2245.9607 2277.8438,2238.1875 L 2266.3438,2244.75 C 2266.2877,2248.8994 2263.4642,2252.8579 2259.9375,2253.8438 C 2212.2194,2256.2199 2170.9081,2252.6001 2130.5,2241.5312 C 2013.187,2213.7899 1977.7097,2186.1922 1930.625,2178.0312 C 1911.7915,2174.717 1891.1259,2173.4679 1882.3438,2185.6875 C 1872.1961,2198.0574 1863.7737,2221.5375 1849.25,2243.4062 C 1822.0236,2234.7583 1800.4009,2226.7862 1778.125,2222.0938 C 1748.3715,2215.8261 1726.916,2216.2104 1709.375,2216.2103 C 1692.1237,2216.2103 1670.3965,2215.8289 1640.6562,2222.0938 C 1618.3803,2226.7862 1596.7576,2234.7583 1569.5312,2243.4062 C 1555.0076,2221.5375 1546.5851,2198.0574 1536.4375,2185.6875 C 1530.9486,2178.0503 1520.7979,2175.687 1509.375,2175.7812 z"
       id="path11285"
       style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#dc8200;stroke-width:3.12500000000000000;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
    <path
       d="M 1500.6903,2234.121 C 1508.0312,2247.1947 1511.0169,2257.535 1513.8557,2268.9216"
       id="path37344"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       d="M 1216.3066,2320.8437 C 1246.2958,2317.5911 1255.032,2316.7669 1279.8308,2312.6452 C 1303.094,2308.4031 1322.2953,2304.1418 1343.2055,2298.487 C 1349.5389,2307.9116 1355.4301,2316.9593 1361.9897,2326.3085 C 1367.8706,2335.6829 1370.4889,2339.127 1379.612,2358.4538 C 1360.7878,2360.1628 1345.2106,2363.0158 1325.4063,2365.5542 C 1308.4168,2367.7658 1288.9392,2370.4299 1269.0092,2372.8677 C 1261.369,2365.3782 1255.5383,2359.2459 1247.2195,2350.6255 C 1237.066,2340.3966 1229.3252,2332.4297 1216.3066,2320.8437 z"
       id="path47209"
       style="fill:#dd0000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1426.6875,2314.4375 C 1396.5079,2320.8035 1392.7724,2321.4122 1370.1083,2328.7507 C 1381.62,2348.7952 1388.0713,2367.7327 1396.0878,2384.3856 C 1419.3325,2379.1189 1431.1515,2376.6733 1453.6562,2372.0312 L 1442.25,2347.5312 L 1426.6875,2314.4375 z"
       id="path51761"
       style="fill:#dd0000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1268.9197,2372.8098 C 1287.3625,2370.618 1305.4733,2368.0941 1324.2481,2365.6367 C 1346.1962,2362.6923 1360.9731,2360.2205 1381.1284,2358.2057 C 1385.2913,2367.8938 1387.4348,2373.0988 1392.3719,2383.9876 C 1396.5026,2393.0765 1401.9566,2401.7022 1406.0669,2409.0416 C 1392.7213,2410.8989 1382.4965,2412.4905 1367.8229,2414.0158 C 1351.9732,2415.352 1346.2445,2415.8607 1333.4211,2415.0365 C 1320.8055,2413.8992 1311.5763,2411.434 1300.3551,2402.6607 C 1293.0982,2396.8113 1281.5499,2385.048 1268.9197,2372.8098 z"
       id="path61628"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1396.1015,2384.3877 C 1416.1564,2379.7088 1434.1548,2375.9205 1455.323,2371.687 C 1460.3635,2383.8375 1462.3347,2389.3823 1466.6329,2401.9039 C 1471.1121,2414.5071 1474.8491,2425.9227 1478.9572,2437.932 C 1468.9042,2440.6361 1465.16,2441.4846 1453.9196,2442.9269 C 1444.8332,2443.596 1436.3406,2442.6323 1429.7778,2437.3638 C 1424.5155,2433.5698 1417.0266,2422.0568 1409.983,2409.7274 C 1404.6616,2400.2417 1400.9776,2394.4671 1396.1015,2384.3877 z"
       id="path64666"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1697.7812,2292.5 C 1680.1373,2293.4452 1662.5165,2295.6783 1656.75,2297.0625 C 1622.7563,2305.382 1602.4733,2312.4686 1579.2188,2320.2812 C 1538.0632,2334.0357 1525.0917,2340.3644 1501.9375,2347.4375 C 1483.6245,2353.0501 1470.6154,2356.0826 1453.9375,2359.9062 C 1461.9555,2378.9397 1467.946,2396.2834 1475.1562,2417 C 1496.0958,2413.4032 1512.8776,2409.6645 1533.75,2403.375 C 1557.151,2395.6658 1577.7189,2389.1108 1602.9375,2381.4688 C 1624.7647,2374.8609 1640.2509,2371.1436 1669.2812,2366.2188 C 1680.8737,2365.1272 1689.3078,2364.4546 1698.0938,2364.1562 L 1698.0938,2364.1875 C 1702.2788,2364.0455 1705.8601,2363.9902 1709.375,2363.9688 C 1712.8983,2363.9899 1716.4909,2364.0451 1720.6875,2364.1875 L 1720.6875,2364.1562 C 1729.4652,2364.4551 1737.9175,2365.1282 1749.5,2366.2188 C 1778.5304,2371.1436 1794.0166,2374.8609 1815.8438,2381.4688 C 1841.0623,2389.1108 1861.6303,2395.6658 1885.0312,2403.375 C 1905.9036,2409.6645 1922.6854,2413.4032 1943.625,2417 C 1950.8352,2396.2834 1956.8257,2378.9397 1964.8438,2359.9062 C 1948.1658,2356.0826 1935.1568,2353.0501 1916.8438,2347.4375 C 1893.6895,2340.3644 1880.718,2334.0357 1839.5625,2320.2812 C 1816.3079,2312.4686 1796.0249,2305.382 1762.0312,2297.0625 C 1756.2648,2295.6783 1738.644,2293.4452 1721,2292.5 C 1710.1993,2292.0548 1708.5262,2292.0548 1697.7812,2292.5 z"
       id="path66943"
       style="fill:#dd0000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1699.5312,2363.9375 L 1699.5312,2364 C 1680.2216,2364.3251 1666.6433,2365.8938 1637.8125,2372.0938 C 1590.0719,2383.2022 1548.3649,2399.5466 1520.9062,2407.0625 C 1504.7531,2411.1495 1490.7949,2414.0385 1475.1875,2417.125 C 1480.3102,2433.2656 1485.8998,2448.0085 1491.75,2461.375 C 1497.9058,2471.4345 1506.6836,2472.5651 1516.25,2471.4375 C 1531.5347,2469.091 1544.0958,2466.3899 1559.5625,2462.4062 C 1590.2764,2454.1382 1615.3378,2445.5881 1644.6875,2439.5938 C 1668.1548,2435.3266 1686.7616,2434.0911 1709.375,2433.4375 C 1731.9903,2434.0911 1750.5938,2435.3264 1774.0625,2439.5938 C 1803.4121,2445.5881 1828.5049,2454.1382 1859.2188,2462.4062 C 1874.6854,2466.3899 1887.2466,2469.091 1902.5312,2471.4375 C 1912.0976,2472.5651 1920.8754,2471.4345 1927.0312,2461.375 C 1932.8815,2448.0085 1938.4711,2433.2656 1943.5938,2417.125 C 1927.9864,2414.0385 1913.9969,2411.1495 1897.8438,2407.0625 C 1870.3852,2399.5466 1828.7094,2383.2022 1780.9688,2372.0938 C 1752.151,2365.8966 1738.5457,2364.3261 1719.25,2364 L 1719.25,2363.9375 C 1715.461,2363.9154 1712.6655,2363.9667 1709.375,2363.9688 C 1706.0894,2363.9668 1703.3139,2363.9154 1699.5312,2363.9375 z"
       id="path68461"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1917.8244,2234.899 C 1912.0394,2246.9354 1907.4978,2258.0536 1904.3997,2268.9216"
       id="path69240"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       d="M 2202.4674,2320.8437 C 2172.4782,2317.5911 2163.742,2316.7669 2138.9432,2312.6452 C 2115.68,2308.4031 2096.4787,2304.1418 2075.5685,2298.487 C 2069.2351,2307.9116 2063.3439,2316.9593 2056.7843,2326.3085 C 2050.9034,2335.6829 2048.2851,2339.127 2039.162,2358.4538 C 2057.9862,2360.1628 2073.5634,2363.0158 2093.3677,2365.5542 C 2110.3572,2367.7658 2129.8348,2370.4299 2149.7648,2372.8677 C 2157.405,2365.3782 2163.2357,2359.2459 2171.5545,2350.6255 C 2181.708,2340.3966 2189.4488,2332.4297 2202.4674,2320.8437 z"
       id="path69242"
       style="fill:#dd0000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1992.0865,2314.4375 C 2022.2661,2320.8035 2026.0016,2321.4122 2048.6657,2328.7507 C 2037.154,2348.7952 2030.7027,2367.7327 2022.6862,2384.3856 C 1999.4415,2379.1189 1987.6225,2376.6733 1965.1178,2372.0312 L 1976.524,2347.5312 L 1992.0865,2314.4375 z"
       id="path69246"
       style="fill:#dd0000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 2149.8543,2372.8098 C 2131.4115,2370.618 2113.3007,2368.0941 2094.5259,2365.6367 C 2072.5778,2362.6923 2057.8009,2360.2205 2037.6456,2358.2057 C 2033.4827,2367.8938 2031.3392,2373.0988 2026.4021,2383.9876 C 2022.2714,2393.0765 2016.8174,2401.7022 2012.7071,2409.0416 C 2026.0527,2410.8989 2036.2775,2412.4905 2050.9511,2414.0158 C 2066.8008,2415.352 2072.5295,2415.8607 2085.3529,2415.0365 C 2097.9685,2413.8992 2107.1977,2411.434 2118.4189,2402.6607 C 2125.6758,2396.8113 2137.2241,2385.048 2149.8543,2372.8098 z"
       id="path69248"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 2022.6725,2384.3877 C 2002.6176,2379.7088 1984.6192,2375.9205 1963.451,2371.687 C 1958.4105,2383.8375 1956.4393,2389.3823 1952.1411,2401.9039 C 1947.6619,2414.5071 1943.9249,2425.9227 1939.8168,2437.932 C 1949.8698,2440.6361 1953.614,2441.4846 1964.8544,2442.9269 C 1973.9408,2443.596 1982.4334,2442.6323 1988.9962,2437.3638 C 1994.2585,2433.5698 2001.7474,2422.0568 2008.791,2409.7274 C 2014.1124,2400.2417 2017.7964,2394.4671 2022.6725,2384.3877 z"
       id="path69250"
       style="fill:#ffc709;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       d="M 1413.6307,2286.6114 C 1418.4273,2299.96 1428.8774,2316.9829 1435.6849,2331.337 C 1438.5821,2336.8789 1447.9593,2356.4977 1454.7668,2374.4407"
       id="path38106"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:3.125;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       d="M 1327.2892,2272.5022 C 1338.4755,2289.9864 1348.9433,2306.0333 1360.9117,2323.1823 C 1369.5385,2335.7465 1374.9313,2347.9815 1380.4637,2360.6116"
       id="path38104"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:3.125;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
    <path
       d="M 2091.2255,2274.3173 C 2080.0392,2291.8015 2069.8307,2306.0333 2057.8623,2323.1823 C 2049.2355,2335.7465 2043.8427,2347.9815 2038.3103,2360.6116"
       id="path69244"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:3.125;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
    <path
       d="M 2005.0727,2285.3348 C 2000.2761,2298.6834 1989.826,2317.0028 1983.0185,2331.3569 C 1980.1213,2336.8988 1970.7441,2356.5176 1963.9366,2374.4606"
       id="path73072"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:3.125;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1" />
    <path
       d="M 1146.3701,2241.2391 C 1144.5288,2244.0385 1145.7481,2248.3188 1147.169,2250.8987 C 1148.3778,2253.0935 1152.3761,2258.3245 1157.7853,2259.0783 C 1198.6729,2260.6909 1224.9801,2260.1652 1267.2285,2252.0575 C 1311.8638,2241.5148 1352.0475,2231.5554 1397.1855,2214.6778 C 1423.7457,2205.0969 1455.3921,2191.5295 1474.3917,2186.3475 C 1498.2815,2179.9156 1521.6358,2175.8808 1529.9539,2186.0258 C 1535.922,2195.3691 1516.0841,2206.3385 1496.0568,2212.9752 C 1472.788,2220.0364 1450.8938,2223.6611 1427.4875,2226.7358 C 1402.7798,2231.2586 1376.56,2236.1937 1354.4641,2242.9159 C 1340.6303,2247.3928 1324.8158,2258.6493 1326.5156,2268.4874 C 1329.3798,2281.3542 1347.6962,2277.6814 1364.032,2272.2654 L 1472.3709,2230.9011 C 1484.7247,2226.3877 1497.9764,2227.907 1500.772,2234.544 C 1503.2187,2241.3304 1501.2666,2250.7286 1484.6057,2254.0783 L 1432.7388,2262.835 C 1414.3318,2266.1793 1412.2771,2279.5554 1413.6745,2284.3806 C 1415.2189,2289.3982 1422.6993,2296.4184 1444.8635,2291.1261 C 1495.7403,2278.6668 1531.2211,2260.9839 1564.09,2250.8615 C 1644.1915,2223.659 1659.0921,2221.6099 1709.2999,2221.4107 C 1757.735,2221.5118 1773.086,2223.1832 1854.684,2250.8615 C 1887.5529,2260.9839 1923.0337,2278.6668 1973.9105,2291.1261 C 1996.0747,2296.4184 2003.2958,2288.6203 2004.8402,2283.6027 C 2006.2376,2278.7775 2003.6642,2268.2538 1986.0352,2262.835 L 1934.1683,2254.0783 C 1917.5074,2250.7286 1915.5553,2241.3304 1918.002,2234.544 C 1920.7976,2227.907 1934.0493,2226.3877 1946.4031,2230.9011 L 2054.742,2272.2654 C 2071.0778,2277.6814 2090.1722,2281.8728 2093.0364,2269.006 C 2094.7362,2259.1679 2082.0333,2248.1707 2064.3099,2242.9159 C 2042.214,2236.1937 2015.9942,2231.2586 1991.2865,2226.7358 C 1967.8802,2223.6611 1945.986,2220.0364 1922.7172,2212.9752 C 1902.6899,2206.3385 1882.852,2195.6285 1888.5608,2186.0258 C 1898.1755,2175.6215 1922.0484,2179.6563 1944.3823,2186.3475 C 1963.3819,2191.5295 1995.0283,2205.0969 2021.5885,2214.6778 C 2066.7265,2231.5554 2106.9102,2241.5148 2151.5455,2252.0575 C 2193.7939,2260.1652 2220.1011,2260.6909 2260.9887,2259.0783 C 2266.3979,2258.3245 2270.3962,2253.0935 2271.605,2250.8987 C 2273.0259,2248.3188 2274.2452,2244.0385 2272.4039,2241.2391"
       id="path35068"
       style="fill:none;fill-opacity:0.75;fill-rule:evenodd;stroke:#ffc709;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  </g>
  <title>Wolfson</title>
                </g>
                <g id="SPC" transform="scale(0.5)">
                  <title>Peters</title>
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
                  <title>Trinity</title>
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
                  <title>Worcester</title>
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
                  <title>Wolfson</title>
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
                  <title>Wadham</title>
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
        <v-menu offset-y attach>
          <v-btn class="mt-1 ml-1" color="primary" style="height: 39px;" slot="activator">{{(event ? `${event.name} ${event.year}` : '')}}</v-btn>
          <v-list dense>
            <v-list-tile v-for="event in events" :key="event.year+event.name" :to="`/${event.name.toLowerCase()}/${event.year}`" style="background-color:white;">
              <v-list-tile-title>{{`${event.name} ${event.year}`}}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile color="primary" href="http://oxbump.feathersquare.com/historical20.php" target="_blank" style="background-color:white;">
              <v-list-tile-title>Historic data</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
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
    <v-snackbar top v-model="firstVisit" :timeout="0">
      Race times are displayed in your local time :)
      <v-btn flat color="pink" @click="dismissFirst()">Close</v-btn>
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
Vue.use(Vuetify)
export default {
  data() {
    return {
      countDownDate: new Date('February 27, 2019 12:00:00').getTime(),
      announcementDraft: '',
      bladesOnly: false,
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
      firstVisit: false,
      boatsHigh: [],
      divs: false,
      events: [],
      chartData: {}
    }
  },
  beforeMount () {
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
    $route() {
      this.selectEvent()
    },
    bladesOnly() {
      if (this.bladesOnly) {
        this.boatsSelected = this.boats.filter((boat) => boat.moves.reduce((acc, move) => acc && (move.moves > 0 || (boat.start === 1 && move.moves === 0)), true))
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
          this.boatsHigh.push(boat)
        })
      }
    }
  },
  created() {
    this.firstVisit = !localStorage.getItem('wasHere')
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
    dismissFirst() {
      this.firstVisit = false
      localStorage.setItem('wasHere', true)
    },
    onClick(ev) {
      if (['use','path','button'].indexOf(ev.target.tagName.toLowerCase()) === -1) {
        this.boatsSelected = []
        this.clubSelected = false
        this.bladesOnly = false
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
        if (this.eventDay === 4 && this.event && this.event.name.toLowerCase() === 'eights')
          hours -= 1
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
      axios.get(`./data/${event.name.toLowerCase()}_${event.year}.json`)
        .then((response) => {
          for (const club in response.data) {
            for (const gender in response.data[club]) {
              response.data[club][gender] = response.data[club][gender].map((boat, idx) => {
                boat.club = club
                boat.gender = gender
                boat.number = idx
                boat.opacity = 1.0
                boat.short = `${this.clubToName(boat.club)} ${(gender === 'men' ? 'M' : 'W')}${this.romanize(boat.number + 1)}`
                return boat
              })
            }
            Vue.set(this.chartData, club, response.data[club])
          }
          this.bumpBoat = this.boats[0]
          this.bumpDay = this.eventDay
          this.event = event
        })
      axios.get(`./data/${event.name.toLowerCase()}_${event.year}_divs.json`)
        .then((response) => {
          this.divs = response.data
        })
        .catch(() => this.divs = false)
    },
    selectBoat(boat) {
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
      return boat.moves.slice(0,day).reduce((acc, itm) => acc + itm.moves, 0) * -1 + boat.start
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
