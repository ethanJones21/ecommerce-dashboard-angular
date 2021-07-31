import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getClients(term: any, page: number, limit: number): Observable<any> {
    return this.http
      .get<any>(
        `${apiUrl}/clients/paginado?term=${term}&page=${page}&limit=${limit}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map(({ ok, clients }) => clients));
  }

  getClient(id: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}/clients/${id}`, {
        headers: this.headers,
      })
      .pipe(map(({ ok, client }) => client));
  }

  createClient(data: {}): Observable<any> {
    return this.http.post<any>(`${apiUrl}/clients/test`, data, {
      headers: this.headers,
    });
  }

  updateClient(id: string, data: {}) {
    return this.http.put<any>(`${apiUrl}/clients/${id}`, data, {
      headers: this.headers,
    });
  }

  deactivateClient(id: string) {
    return this.http.patch<any>(`${apiUrl}/clients/${id}`, {
      headers: this.headers,
    });
  }
}
