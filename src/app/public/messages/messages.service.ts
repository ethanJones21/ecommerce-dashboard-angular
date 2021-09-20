import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}
  getMessages(term: any, page: number, limit: number): Observable<any> {
    return this.http
      .get<any>(
        `${apiUrl}/users/messages/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, messages }) => messages));
  }

  getOrder(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/users/messages/${id}`);
  }

  updateOrder(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/users/messages/${id}`, data);
  }
}
