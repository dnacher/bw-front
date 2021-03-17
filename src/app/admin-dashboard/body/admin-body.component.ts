import {AfterViewInit, Component, OnInit} from '@angular/core';
import { icon, Marker } from 'leaflet';
import * as L  from 'leaflet';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-admin-body',
  templateUrl: './admin-body.component.html',
  styleUrls: ['./admin-body.component.scss']
})
export class AdminBodyComponent implements AfterViewInit {
  private map;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text:'Ventas',
      style: {
        color: '#00A8FF'
      }
    },
    series: [
     {
        name: 'Ventas 2020',
        color: '#00A8FF',
        type: 'areaspline',
        keys: ['y','selected'],
        data: [
          [29.9, false],
          [71.5, false],
          [128.5, false],
          [56.3, false],
          [81.7, false],
          [61.2, false],
          [99.9, false],
          [121.5, false],
          [128.5, false],
          [138.5, false],
          [156.3, false],
          [236.3, false],
        ]
      },
      {
        name: 'Ventas 2021',
        color: '#40B62F',
        type: 'areaspline',
        keys: ['y','selected'],
        data: [
          [24.4, false],
          [45.7, false],
          [90.5, false],
        ]
      }
    ],
    yAxis: {
      visible: false,
    },
    xAxis: {
      visible: false,
      categories: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Oct',
        'Nov',
        'Dic',
      ]
    },
    defs: {
      gradient0: {
        tagName: 'linearGradient',
        id: 'gradient0',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop'
          },
          {
            tagName: 'stop'
          }
        ]
      }
    }
  };
  piechartOptions: Highcharts.Options = {
    series: [
      {
        name: 'Mas vendidos',
        color: '#00A8FF',
        type: 'pie',
        keys: ['y', 'selected'],
        data: [
          {name: 'Hamburguesa con papas', y: 71.5},
          {name: 'Panchos con guarnicion', y: 128.5},
          {name: 'Ravioles', y: 56.3},
          {name: 'Sushi', y: 81.7},
          {name: 'Asado', y: 61.2},
          {name: 'Ensalada', y: 29.9},
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit() {
    this.initMap();
    this.initChart();
  }

  initChart() {

  }

  initMap() {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
    this.map = L.map('map').setView([-34.871010, -56.116631],15);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });
    tiles.addTo(this.map);

    var locations = [
      ["Cliente 110", -34.871151, -56.116717],
      ["Cliente 045", -34.872559, -56.114632],
      ["Cliente 178", -34.871870, -56.119797]
    ];

    for (var i = 0; i < locations.length; i++) {
      var marker = new L.marker([locations[i][1], locations[i][2]])
        .bindPopup(locations[i][0])
        .addTo(this.map);
    }

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
