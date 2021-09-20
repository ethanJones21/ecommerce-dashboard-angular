import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderItf } from './models/order.interface';
import {
  getOrdersItf,
  onlyOrdersInfoItf,
  getOrderItf,
  createUpdateOrdersItf,
} from './models/order-api.interfaces';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(
    term: any,
    page: number,
    limit: number
  ): Observable<onlyOrdersInfoItf> {
    return this.http
      .get<getOrdersItf>(
        `${apiUrl}/users/orders/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, orders }) => orders));
  }

  getOrder(id: string): Observable<getOrderItf> {
    return this.http.get<getOrderItf>(`${apiUrl}/users/orders/${id}`);
  }

  updateOrder(id: string, data: any): Observable<createUpdateOrdersItf> {
    return this.http.put<createUpdateOrdersItf>(
      `${apiUrl}/users/orders/${id}`,
      data
    );
  }
}
