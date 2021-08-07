import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductItf } from '../models/product.interface';
import {
  GETPRODUCTS,
  CREATEUPDATEPRODUCT,
  DESACTIVATEPRODUCT,
  ONLYPRODUCTSINFO,
} from '../models/product-api.interface';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getProducts(
    term: any,
    page: number,
    limit: number
  ): Observable<ONLYPRODUCTSINFO> {
    return this.http
      .get<GETPRODUCTS>(
        `${apiUrl}/products/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, products }) => products));
  }

  getProduct(id: string): Observable<ProductItf> {
    return this.http
      .get<any>(`${apiUrl}/products/${id}`)
      .pipe(map(({ ok, product }) => product));
  }

  createProduct(data: ProductItf): Observable<CREATEUPDATEPRODUCT> {
    return this.http.post<CREATEUPDATEPRODUCT>(`${apiUrl}/products`, data);
  }

  updateProduct(id: string, data: ProductItf): Observable<CREATEUPDATEPRODUCT> {
    return this.http.put<CREATEUPDATEPRODUCT>(`${apiUrl}/products/${id}`, data);
  }

  deactivateProduct(id: string): Observable<DESACTIVATEPRODUCT> {
    return this.http.patch<DESACTIVATEPRODUCT>(`${apiUrl}/products/${id}`, {
      id,
    });
  }
}
