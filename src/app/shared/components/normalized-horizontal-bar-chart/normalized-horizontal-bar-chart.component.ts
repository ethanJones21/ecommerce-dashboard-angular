import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Normalized-horizontal-bar-chart',
  templateUrl: './normalized-horizontal-bar-chart.component.html',
  styleUrls: ['./normalized-horizontal-bar-chart.component.scss'],
})
export class NormalizedHorizontalBarChartComponent implements OnInit {
  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 73000000,
        },
        {
          name: '2011',
          value: 89400000,
        },
        {
          name: '1990',
          value: 62000000,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 309000000,
        },
        {
          name: '2011',
          value: 311000000,
        },
        {
          name: '1990',
          value: 250000000,
        },
      ],
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 50000020,
        },
        {
          name: '2011',
          value: 58000000,
        },
        {
          name: '1990',
          value: 58000000,
        },
      ],
    },
    {
      name: 'UK',
      series: [
        {
          name: '2010',
          value: 62000000,
        },
        {
          name: '1990',
          value: 57000000,
        },
      ],
    },
  ];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Normalized Population';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {
    Object.assign(this, { multi: this.multi });
  }
  ngOnInit(): void {}

  onSelect(event: any) {
    console.log(event);
  }
}
