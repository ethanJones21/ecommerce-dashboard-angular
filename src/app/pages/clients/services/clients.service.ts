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
}
