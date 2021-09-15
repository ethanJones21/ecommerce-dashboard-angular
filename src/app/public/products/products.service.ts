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
        `${apiUrl}/users/products/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, products }) => products));
  }

  getProduct(id: string): Observable<ProductItf> {
    return this.http
      .get<getProductItf>(`${apiUrl}/users/products/${id}`)
      .pipe(map(({ ok, product }) => product));
  }

  createProduct(data: any, file: File): Observable<createUpdateProductsItf> {
    const fd = new FormData();
    this.destructureData(data, file, fd);
    return this.http.post<createUpdateProductsItf>(
      `${apiUrl}/users/products`,
      fd
    );
  }

  updateProduct(
    id: string,
    data: any,
    file: File
  ): Observable<createUpdateProductsItf> {
    const fd = new FormData();
    this.destructureData(data, file, fd);
    return this.http.put<createUpdateProductsItf>(
      `${apiUrl}/users/products/${id}`,
      fd
    );
  }

  deactivateProduct(id: string): Observable<desactivateProductItf> {
    return this.http.patch<desactivateProductItf>(
      `${apiUrl}/users/products/${id}`,
      {
        active: false,
      }
    );
  }

  getImg(img: string) {
    return `${apiUrl}/file/products/${img}`;
  }

  private destructureData(data: any, file: File, fd: FormData) {
    const { name, stock, price, category, description, content } = data;
    if (name) fd.append('name', name);
    if (stock) fd.append('stock', stock);
    if (price) fd.append('price', price);
    if (category) fd.append('category', category);
    if (description) fd.append('description', description);
    if (content) fd.append('content', content);
    fd.append('cover', file);
  }
}
