import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserItf } from './models/user.interface';
import { onlyUsersInfoItf } from './models/user-api.interfaces';
import {
  getUsersItf,
  createUpdateUsersItf,
  desactivateUserItf,
  getUserItf,
} from './models/user-api.interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private http: HttpClient) {}

  getUsers(
    term: any,
    page: number,
    limit: number
  ): Observable<onlyUsersInfoItf> {
    return this.http
      .get<getUsersItf>(
        `${apiUrl}/admins/users/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, users }) => users));
  }

  getUser(id: string): Observable<UserItf> {
    return this.http
      .get<getUserItf>(`${apiUrl}/admins/users/${id}`)
      .pipe(map(({ ok, user }) => user));
  }

  createUser(data: {}): Observable<createUpdateUsersItf> {
    return this.http.post<createUpdateUsersItf>(`${apiUrl}/admins/users`, data);
  }

  updateUser(id: string, data: {}): Observable<createUpdateUsersItf> {
    return this.http.put<createUpdateUsersItf>(
      `${apiUrl}/admins/users/${id}`,
      data
    );
  }

  deactivateUser(id: string): Observable<desactivateUserItf> {
    return this.http.patch<desactivateUserItf>(`${apiUrl}/admins/users/${id}`, {
      active: false,
    });
  }
}
