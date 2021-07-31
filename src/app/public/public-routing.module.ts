import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './inicio/home.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'clients/:id',
        component: ClientComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:id',
        component: ProductComponent,
      },
    ],
  },
  // { path: '**', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
