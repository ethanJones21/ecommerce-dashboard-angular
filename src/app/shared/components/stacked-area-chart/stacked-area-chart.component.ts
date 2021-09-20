import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../../private/home/home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'Stacked-area-chart',
  templateUrl: './stacked-area-chart.component.html',
  styleUrls: ['./stacked-area-chart.component.scss'],
})
export class StackedAreaChartComponent implements OnInit {
  @ViewChild('chartArea') chartArea!: any;
  year = new Date().getFullYear();
  multi$!: Observable<any[]>;
  loading = true;
  multi = [
    {
      name: 'Ventas por mes',
      series: [],
    },
  ];

  view: [number, number] = [560, 400];

  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = String(this.year);
  yAxisLabel: string = 'Dinero';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#FD1724', '#E44D25', '#F79638', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  constructor(private homeServ: HomeService) {}

  ngOnInit(): void {
    this.getSeries();
  }

  getSeries() {
    this.homeServ.getGraphSalesXMonth(this.year).subscribe((series: []) => {
      this.multi[0].series = series;
      this.loading = false;
    });
  }

  onSelect(event: any) {
    console.log(event);
  }
}
