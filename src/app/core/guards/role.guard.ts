import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { ROLES } from '../models/roles.model';
// import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private roleServ: RoleService) {} //private auth: AuthService

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
    return (route.data.role === this.roleServ.getRole() ||
      this.roleServ.getRole() === 'ADMIN') &&
      ROLES.includes(this.roleServ.getRole())
      ? true
      : false;
  }
}
