import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from '../auth/guards/role.guard';
import { TokenExpiredGuard } from '../auth/guards/token-expired.guard';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ConfigsComponent } from './configs/configs.component';
import { PrivateComponent } from './private.components';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard, TokenExpiredGuard],
    component: PrivateComponent,
    children: [
      {
        path: 'inicio',
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
        path: 'configs',
        data: { role: 'ADMIN' },
        component: ConfigsComponent,
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
