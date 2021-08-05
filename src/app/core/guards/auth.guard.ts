import { Injectable } from '@angular/core';
import {
  Route,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkUserLogin(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const url = `/${route.path}`;
    return this.checkUserLogin(url);
  }

  isTokenExpired(): boolean {
    const token = this.authServ.getToken();
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  checkUserLogin(url: string): boolean {
    if (this.authServ.isLoggedIn(url)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
