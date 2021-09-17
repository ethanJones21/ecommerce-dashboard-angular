import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { RoleGuard } from '../auth/guards/role.guard';
import { TokenExpiredGuard } from '../auth/guards/token-expired.guard';
import { InventoryComponent } from './products/inventory/inventory.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponComponent } from './coupons/coupon/coupon.component';
import { VarietiesComponent } from './products/varieties/varieties.component';
import { GaleryComponent } from './products/galery/galery.component';
import { MessagesComponent } from './messages/messages.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard, TokenExpiredGuard],
    component: PublicComponent,
    children: [
      {
        path: 'products',
        data: { role: 'USER' },
        component: ProductsComponent,
      },
      {
        path: 'messages',
        data: { role: 'USER' },
        component: MessagesComponent,
      },
      {
        path: 'products/:id',
        data: { role: 'USER' },
        component: ProductComponent,
      },
      {
        path: 'products/inventory/:productID',
        data: { role: 'ADMIN' },
        component: InventoryComponent,
      },
      {
        path: 'products/varieties/:productID',
        data: { role: 'USER' },
        component: VarietiesComponent,
      },
      {
        path: 'products/galery/:productID',
        data: { role: 'USER' },
        component: GaleryComponent,
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
      {
        path: 'orders',
        data: { role: 'USER' },
        component: OrdersComponent,
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
  {
    path: 'admins',
    loadChildren: () =>
      import('../private/private.module').then((m) => m.PrivateModule),
  },
  {
    path: '404',
    component: NopagefoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
