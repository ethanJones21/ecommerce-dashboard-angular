import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getProducts(term: any, page: number, limit: number): Observable<any> {
    return this.http
      .get<any>(
        `${apiUrl}/products/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, products }) => products));
  }

  getProduct(id: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}/products/${id}`)
      .pipe(map(({ ok, product }) => product));
  }

  createProduct(data: {}): Observable<any> {
    return this.http.post<any>(`${apiUrl}/products`, data);
  }

  updateProduct(id: string, data: {}) {
    return this.http.put<any>(`${apiUrl}/products/${id}`, data);
  }

  deactivateProduct(id: string) {
    return this.http.patch<any>(`${apiUrl}/products/${id}`, { id });
  }
}
