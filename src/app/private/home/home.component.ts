import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  total = 0;
  totalMonth = 0;
  totalPrevMonth = 0;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  constructor(private homeServ: HomeService) {}
  ngOnInit(): void {
    this.getTotalSales();
    this.getTotalSalesByMonth();
    this.getTotalSalesByPreviousMonth();
  }
  getTotalSales() {
    this.homeServ.getTotalSales().subscribe((total) => (this.total = total));
  }
  getTotalSalesByMonth() {
    this.homeServ
      .getTotalSalesByMonth(this.year, this.month)
      .subscribe((total) => (this.totalMonth = total));
  }
  getTotalSalesByPreviousMonth() {
    this.homeServ
      .getTotalSalesByMonth(this.year, this.month - 1)
      .subscribe((total) => (this.totalPrevMonth = total));
  }
}
