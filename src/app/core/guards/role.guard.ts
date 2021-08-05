import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
  roles = ['ADMIN', 'USER'];

  constructor(private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkRole(route, state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  checkRole(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // localStorage.setItem('prueba', route.data.role);
    // localStorage.setItem('prueba2', this.roles[0]);
    // return route.data.role === this.auth.getRole() &&
    //   this.roles.includes(this.auth.getRole())
    //   ? true
    //   : false;
  }
}
