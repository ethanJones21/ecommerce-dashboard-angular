import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  getTotalSales() {
    return this.http
      .get<any>(`${apiUrl}/admins/home/total`)
      .pipe(map(({ ok, total }) => total));
  }
  getTotalSalesByMonth(year: number, month: number) {
    return this.http
      .get<any>(`${apiUrl}/admins/home/month/${year}/${month}`)
      .pipe(map(({ ok, total }) => total));
  }
  getGraphSalesXMonth(year: number) {
    return this.http
      .get<any>(`${apiUrl}/admins/home/graph-sales-month/${year}`)
      .pipe(map(({ ok, series }) => series));
  }
}
