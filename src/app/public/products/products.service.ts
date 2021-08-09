import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductItf } from './models/product.interface';
import { getProductItf } from './models/product-api.interfaces';
import {
  getProductsItf,
  createUpdateProductsItf,
  desactivateProductItf,
  onlyProductsInfoItf,
} from './models/product-api.interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(
    term: any,
    page: number,
    limit: number
  ): Observable<onlyProductsInfoItf> {
    return this.http
      .get<getProductsItf>(
        `${apiUrl}/products/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, products }) => products));
  }

  getProduct(id: string): Observable<ProductItf> {
    return this.http
      .get<getProductItf>(`${apiUrl}/products/${id}`)
      .pipe(map(({ ok, product }) => product));
  }

  createProduct(data: ProductItf): Observable<createUpdateProductsItf> {
    return this.http.post<createUpdateProductsItf>(`${apiUrl}/products`, data);
  }

  updateProduct(
    id: string,
    data: ProductItf
  ): Observable<createUpdateProductsItf> {
    return this.http.put<createUpdateProductsItf>(
      `${apiUrl}/products/${id}`,
      data
    );
  }

  deactivateProduct(id: string): Observable<desactivateProductItf> {
    return this.http.patch<desactivateProductItf>(`${apiUrl}/products/${id}`, {
      id,
    });
  }
}
