import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from '../private/inicio/home.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { RoleGuard } from '../core/guards/role.guard';
import { TokenExpiredGuard } from '../core/guards/token-expired.guard';
import { InventoryComponent } from './products/inventory/inventory.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponComponent } from './coupons/coupon/coupon.component';
import { ConfigsComponent } from '../private/configs/configs.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard, TokenExpiredGuard],
    component: PublicComponent,
    children: [
      {
        path: 'inicio',
        data: { role: 'ADMIN' },
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
        data: { role: 'USER' },
        component: ProductsComponent,
      },
      {
        path: 'products/:id',
        data: { role: 'USER' },
        component: ProductComponent,
      },
      {
        path: 'inventory/:productID',
        data: { role: 'ADMIN' },
        component: InventoryComponent,
      },
      {
        path: 'configs',
        data: { role: 'ADMIN' },
        component: ConfigsComponent,
      },
      {
        path: 'coupons',
        data: { role: 'USER' },
        component: CouponsComponent,
      },
      {
        path: 'coupons/:id',
        data: { role: 'USER' },
        component: CouponComponent,
      },
      { path: '**', redirectTo: 'clients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
