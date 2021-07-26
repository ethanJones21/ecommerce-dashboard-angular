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

  getClients(page: number, limit: number): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}/clients/paginado?page=${page}&limit=${limit}`, {
        headers: this.headers,
      })
      .pipe(map(({ ok, clients }) => clients));
  }

  getPagesClients(): Observable<number> {
    return this.http
      .get<any>(`${apiUrl}/clients/paginado?page=1&limit=1`, {
        headers: this.headers,
      })
      .pipe(map(({ ok, clients }) => clients.longitud));
  }
}
