import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  getCouponsItf,
  onlyCouponsInfoItf,
} from './models/coupon-api.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { deleteInventoryItf } from '../products/models/inventory-api.interface';
import { CouponItf } from './models/coupon.interface';
import {
  getCouponItf,
  createUpdateCouponItf,
} from './models/coupon-api.interface';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(private http: HttpClient) {}

  getCoupons(
    term: any,
    page: number,
    limit: number
  ): Observable<onlyCouponsInfoItf> {
    return this.http
      .get<getCouponsItf>(
        `${apiUrl}/users/coupons/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, coupons }) => coupons));
  }

  getCoupon(id: string): Observable<CouponItf> {
    return this.http
      .get<getCouponItf>(`${apiUrl}/users/coupons/${id}`)
      .pipe(map(({ ok, coupon }) => coupon));
  }

  createCoupon(data: any): Observable<createUpdateCouponItf> {
    return this.http.post<createUpdateCouponItf>(
      `${apiUrl}/users/coupons`,
      data
    );
  }

  updateCoupon(id: string, data: any): Observable<createUpdateCouponItf> {
    return this.http.put<createUpdateCouponItf>(
      `${apiUrl}/users/coupons/${id}`,
      data
    );
  }

  deleteCoupon(id: string): Observable<deleteInventoryItf> {
    return this.http.delete<deleteInventoryItf>(
      `${apiUrl}/users/coupons/${id}`
    );
  }
}
