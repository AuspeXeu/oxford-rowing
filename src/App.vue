<template>
<div id="app">
  <v-app>
    <v-toolbar fixed app dense>
      <v-toolbar-title style="margin-left:15px;">
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="noselect hidden-sm-and-down">Live Bumps</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container v-touch="{
        left: () => drawer = false,
        right: () => drawer = true
      }">
        <v-layout row v-resize="onResize">
          <v-flex id="svg-container" xs10 md10 sm10 offset-xs1 offset-sm1 offset-md2 offset-lg3 offset-xl4>
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
              <g id="containerMen" :transform="`translate(0,15),scale(${scale})`">
                <text x="0" y="35" font-size="25" :transform="`translate(190,-40)`">Men</text>
                <g v-for="div in divsMen" :transform="`translate(0,${(((boatsPerDiv * div.number)  * (47.5 + 10)) -5)})`">
                  <path d="M 0 0 L 405 0" v-if="div.number < divsMen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
                  <text x="0" y="35" font-size="35" transform="translate(415,-300),rotate(-90)">{{divName(div)}}</text>
                </g>
                <g v-for="(boat, idx) in boatsMen" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`">
                  <g transform="translate(50,0)">
                    <path v-for="line in makeLines(boat)" :d="line.path" :stroke-dasharray="(line.status ? '' : '3, 5')" @click="selectBoat(boat)" fill="transparent" :style="`stroke:${boat.color};stroke-width:5;`" />
                    <circle v-for="point in makePoints(boat)" @click="selectBoat(boat)" :cx="point.x" :cy="point.y" r="5" :stroke="boat.color" stroke-width="3" :fill="boat.color" />
                    <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.club}`" @click="clickEnd(boat)" :transform="`translate(${curPoint(boat).x},${curPoint(boat).y})`"></use>
                  </g>
                  <use v-bind:xlink:href="`#${boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified"></use>
                </g>
              </g>
              <g id="containerWomen" :transform="`translate(${offset},15),scale(${scale})`">
                <text x="0" y="35" font-size="25" :transform="`translate(180,-40)`">Women</text>
                <g v-for="div in divsWomen" :transform="`translate(0,${(((boatsPerDiv * div.number)  * (47.5 + 10)) -5)})`">
                  <path d="M 0 0 L 405 0" v-if="div.number < divsWomen.length" fill="transparent" style="stroke:#000;stroke-width:5;" />
                  <text x="0" y="35" font-size="35" transform="translate(415,-300),rotate(-90)">{{divName(div)}}</text>
                </g>
                <g v-for="(boat,idx) in boatsWomen" :transform="`translate(0,${((boat.start - 1) * (47.5 + 10))})`">
                  <g transform="translate(50,0)">
                    <path v-for="line in makeLines(boat)" :d="line.path" :stroke-dasharray="(line.status ? '' : '3, 5')" @click="selectBoat(boat)" fill="transparent" :style="`stroke:${boat.color};stroke-width:5;`" />
                    <circle v-for="point in makePoints(boat)" @click="selectBoat(boat)" :cx="point.x" :cy="point.y" r="5" :stroke="boat.color" stroke-width="3" :fill="boat.color" />
                    <use v-if="boat.moves.length" v-bind:xlink:href="`#${boat.club}`" @click="clickEnd(boat)" :transform="`translate(${curPoint(boat).x},${curPoint(boat).y})`"></use>
                  </g>
                  <use v-bind:xlink:href="`#${boat.club}`" @click="selectBoat(boat)" @dblclick="bumpDialog = verified"></use>
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
                <v-flex xs2 sm3 md3>
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
                    clearable
                    multiple
                    :items="rowOverBoats"
                  ></v-select>
                  <v-select
                    v-show="bumpAction === 'bumps'"
                    label="Boat"
                    item-text="short"
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
              <v-layout wrap v-show="bumpTab === '1'">
                <v-flex xs9 sm9 md9>
                  <v-select
                    label="Boat"
                    item-text="short"
                    v-model="manualBoat"
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
            <small class="pl-3 noselect">*indicates required field</small>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="bumpDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat :disabled="!verified" @click.native="submitBump()">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
      <v-dialog v-model="countDownDlg" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Time to Bumps</span>
            <v-spacer></v-spacer>
            <v-btn icon slot="activator" @click.stop="countDownDlg = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-xs-center headline">{{countDownVal}}</v-card-text>
        </v-card>
      </v-dialog>
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
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-content>
                    <v-text-field
                      autofocus
                      label="Message"
                      :rules="[(v) => Boolean(v.trim().length) || 'An announcement must not be empty']"
                      v-model="announcementDraft"
                      clearable
                      required
                    ></v-text-field>
                </v-list-tile-content>
                <v-list-tile-avatar>
                  <v-btn icon slot="activator" @click.stop="makeAnnouncement()">
                    <v-icon>send</v-icon>
                  </v-btn>
                </v-list-tile-avatar>
              </v-list-tile>
            </v-list>
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
                {{`${reporters} reporter${(reporters > 1 ? 's are' : ' is')} online`}}</br>
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
      <v-menu offset-y left attach>
        <v-btn class="mt-1 ml-1" color="primary" style="height: 39px;" slot="activator">{{(event ? `${event.name} ${event.year}` : '')}}</v-btn>
        <v-list dense>
          <v-list-tile v-for="event in events" :key="event.year+event.name" @click="loadData(event)">
            <v-list-tile-title>{{`${event.name} ${event.year}`}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <div><a href="http://oxbump.feathersquare.com/historical20.php">More historic data</a></div>
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
      countDownDate: new Date('Feb 28, 2018 10:00:00').getTime(),
      countDownVal: '',
      announcementDraft: '',
      announcement: '',
      socket: false,
      countDownDlg: false,
      boatsSelected: [],
      name: 'live',
      drawer: false,
      scale: 0.35,
      timer: 0,
      isLive: false,
      liveTimer: false,
      bumpAction: 'bumps',
      viewers: 0,
      reporters: 0,
      rowOvers: [],
      bumpBoat: false,
      manualBoat: false,
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
      announceDialog: false,
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
      this.countDownDlg = !this.auth
      const countDown = () => {
        now = new Date().getTime()
        const distance = this.countDownDate - now
        if (distance < 0) {
          this.countDownVal = '0d 0h 0m 0s'
          this.countDownDlg = false
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          this.countDownVal = `${days}d ${hours}h ${minutes}m ${seconds}s`
        }
      }
      countDown()
      setInterval(countDown, 1000)
    }
    this.loadData(this.events.sort((a,b) => `${b.year}${(b.name == 'Torpids' ? '0' : '1')}` > `${a.year}${(a.name == 'Torpids' ? '0' : '1')}`)[0])
  },
  watch: {
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
      this.boatsHigh.forEach((boat) => this.chartData[boat.club][boat.gender][boat.number].color = 'gray')
      this.boatsHigh = []
      this.boatsSelected.forEach((boat) => {
        this.chartData[boat.club][boat.gender][boat.number].color = 'orange'
        this.boatsHigh.push(boat)
      })
    }
  },
  computed: {
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
      let boats = this.divBoats.filter((boat) => this.isActive(boat))
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
    lblCrewSel() {
      return (this.boatsHigh.length > 1 ? 'Crews' : 'Crew')
    },
    boats() {
      let boats = []
      for (let key in this.chartData) {
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
      for (let key in this.chartData) {
        this.chartData[key].men.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].men)
      }
      return boats.sort((a,b) => this.curPos(a, this.bumpDay)-this.curPos(b, this.bumpDay))
    },
    boatsWomen() {
      let boats = []
      for (let key in this.chartData) {
        this.chartData[key].women.forEach((boat) => Vue.set(boat, 'id', key))
        boats = boats.concat(this.chartData[key].women)
      }
      return boats.sort((a,b) => this.curPos(a, this.bumpDay)-this.curPos(b, this.bumpDay))
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
    isActive(boat) {
      const hasBumped = (boat) => {
        return this.divBoats.find((b) => this.curPos(b, this.bumpDay - 1) < this.curPos(boat, this.bumpDay - 1) && this.curPos(b, this.bumpDay) > this.curPos(boat, this.bumpDay))
      }
      if (this.event.name.toLowerCase() === 'torpids')
        return !boat.moves[this.bumpDay-1] || !hasBumped(boat)
      else if (this.event.name.toLowerCase() === 'eights')
        return !boat.moves[this.bumpDay-1]
    },
    makeAnnouncement() {
      const txt = this.announcementDraft.trim()
      if (txt.length) {
        axios.post('/announce', {text: txt}, {headers: {'authorization': this.auth}})
        .then((response) => {
          this.announceDialog = false
          this.notify('Announcement made', 'success')
        })
        .catch((error) => {
          this.notify('Failed to make announcement', 'error')
          console.log(error.response.data)
        })
      }
    },
    onResize () {
      clearTimeout(this.timer)
      this.timer = setTimeout(function() {
        const width = document.getElementById('svg-container').offsetWidth
        this.scale = Math.min(width * 0.63 / 577, 0.63)
      }.bind(this), 150)
    },
    clickEnd(boat) {
      if (!this.verified)
        this.selectBoat(boat)
      else {
        const lastMove = boat.moves[boat.moves.length-1]
        axios.post('/bump', {
          year: this.event.year,
          name: this.event.name,
          day: boat.moves.length,
          bumpBoat: boat,
          moves: lastMove.moves,
          status: !lastMove.status
        }, {headers: {'authorization': this.auth}})
        .then((response) => this.notify(`Result ${lastMove.status ? 'withdrawn' : 'confirmed'}`, 'success'))
        .catch((error) => {
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
      if (this.bumpTab === '1' && this.manualBoat 
        && this.manualBoat.moves[this.bumpDay-1]
        && this.manualBoat.moves[this.bumpDay-1].status
        && !confirm('You are about to edit a confirmed result, do you know what you are doing?'))
        return
      axios.post('/bump', {
        year: this.event.year,
        name: this.event.name,
        day: this.bumpDay,
        moves: parseInt(this.bumpMoves, 10),
        status: (this.manualBoat && this.manualBoat.moves[this.bumpDay-1] ? this.manualBoat.moves[this.bumpDay-1].status : undefined),
        bumpBoat: (this.bumpTab === '0' ? this.bumpBoat : this.manualBoat),
        rowOvers: (this.bumpTab === '0' && this.bumpAction === 'row over' ? this.rowOvers : undefined),
        bumpedBoat: (this.bumpTab === '0' && this.bumpAction === 'bumps' ? this.bumpedBoat : undefined)
      }, {headers: {'authorization': this.auth}})
      .then((response) => this.notify('Bump submitted', 'success'))
      .catch((error) => {
        console.log(error.response.data)
        this.notify('Failed to submit bump', 'error')
      })
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
      this.divs = false
      this.chartData = {}
      axios.get(`./data/${event.name.toLowerCase()}_${event.year}.json`)
        .then((response) => {
          for (let club in response.data) {
            for (let gender in response.data[club]) {
              response.data[club][gender] = response.data[club][gender].map((boat, idx) => {
                boat.club = club
                boat.gender = gender
                boat.number = idx
                boat.color = 'gray'
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
      const divs = (boat.gender === 'men' ? this.divsMen : this.divsWomen)
      this.bumpDivision = Math.min(Math.ceil(boat.start / this.boatsPerDiv), divs.length)
      this.bumpBoat = boat
      this.manualBoat = boat
      this.boatsHigh.forEach((boat) => this.chartData[boat.club][boat.gender][boat.number].color = 'gray')
      this.boatsHigh = [boat]
      this.boatsSelected = [boat]
      this.chartData[boat.club][boat.gender][boat.number].color = 'orange'
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
