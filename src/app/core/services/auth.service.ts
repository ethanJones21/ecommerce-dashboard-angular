import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly ISROLE = 'role';
  readonly ISTOKEN = 'token';
  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder = '';

  loginFirst = false;
  tokenFirst = '';
  roleFirst = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  constructor() {}

  login() {
    this.loginFirst = true;
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    this.changeLoginStatusSubject.next(true);
  }

  logout() {
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  isLoggedIn(url: string): boolean {
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY) || this.loginFirst;
    this.urlUsuarioIntentaAcceder = url;
    return !isLogged ? false : true;
  }

  saveRoleAndToken(role: string, token: string) {
    this.tokenFirst = token;
    this.roleFirst = role;
    localStorage.setItem(this.ISTOKEN, token);
    localStorage.setItem(this.ISROLE, role);
  }

  getToken(): string {
    return localStorage.getItem(this.ISTOKEN) || this.tokenFirst;
  }

  getRole(): string {
    return localStorage.getItem(this.ISROLE) || this.roleFirst;
  }
}
