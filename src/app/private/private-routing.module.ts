import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from '../auth/guards/role.guard';
import { TokenExpiredGuard } from '../auth/guards/token-expired.guard';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { SettingsComponent } from './settings/settings.component';
import { PrivateComponent } from './private.components';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard, TokenExpiredGuard],
    component: PrivateComponent,
    children: [
      {
        path: 'home',
        data: { role: 'ADMIN' },
        component: HomeComponent,
      },
      {
        path: 'clients',
        data: { role: 'ADMIN' },
        component: ClientsComponent,
      },
      {
        path: 'clients/:id',
        data: { role: 'ADMIN' },
        component: ClientComponent,
      },
      {
        path: 'users',
        data: { role: 'ADMIN' },
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        data: { role: 'ADMIN' },
        component: UserComponent,
      },
      {
        path: 'settings',
        data: { role: 'ADMIN' },
        component: SettingsComponent,
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
