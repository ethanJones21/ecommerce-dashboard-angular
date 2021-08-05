import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './inicio/home.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'inicio',
        data: { role: 'USER' },
        component: HomeComponent,
      },
      {
        path: 'clients',
        data: { role: 'USER' },
        component: ClientsComponent,
      },
      {
        path: 'clients/:id',
        data: { role: 'USER' },
        component: ClientComponent,
      },
      {
        path: 'products',
        data: { role: 'ADMIN' },
        component: ProductsComponent,
      },
      {
        path: 'products/:id',
        data: { role: 'ADMIN' },
        component: ProductComponent,
      },
      { path: '', redirectTo: 'clients', component: ClientsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
