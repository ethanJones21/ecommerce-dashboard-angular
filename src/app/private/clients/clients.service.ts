import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientItf } from './models/client.interface';
import { onlyClientsInfoItf } from './models/client-api.interfaces';
import {
  getClientsItf,
  createUpdateClientsItf,
  desactivateClientItf,
  getClientItf,
} from './models/client-api.interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(
    term: any,
    page: number,
    limit: number
  ): Observable<onlyClientsInfoItf> {
    return this.http
      .get<getClientsItf>(
        `${apiUrl}/admins/clients/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, clients }) => clients));
  }

  getClient(id: string): Observable<ClientItf> {
    return this.http
      .get<getClientItf>(`${apiUrl}/admins/clients/${id}`)
      .pipe(map(({ ok, client }) => client));
  }

  createClient(data: {}): Observable<createUpdateClientsItf> {
    return this.http.post<createUpdateClientsItf>(
      `${apiUrl}/admins/clients/test`,
      data
    );
  }

  updateClient(id: string, data: {}): Observable<createUpdateClientsItf> {
    return this.http.put<createUpdateClientsItf>(
      `${apiUrl}/admins/clients/${id}`,
      data
    );
  }

  deactivateClient(id: string): Observable<desactivateClientItf> {
    return this.http.patch<desactivateClientItf>(
      `${apiUrl}/admins/clients/${id}`,
      {
        active: false,
      }
    );
  }
}
