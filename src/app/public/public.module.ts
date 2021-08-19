import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from '../private/inicio/home.component';
import { RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { InventoryComponent } from './products/inventory/inventory.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponComponent } from './coupons/coupon/coupon.component';
import { ConfigsComponent } from '../private/configs/configs.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    PublicComponent,
    HomeComponent,
    ClientsComponent,
    ClientComponent,
    ProductsComponent,
    ProductComponent,
    InventoryComponent,
    CouponsComponent,
    CouponComponent,
    ConfigsComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgxTinymceModule.forRoot({
      baseURL: './assets/tinymce/',
    }),
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    PublicComponent,
    HomeComponent,
    ClientsComponent,
    ClientComponent,
    ProductsComponent,
    ProductComponent,
    InventoryComponent,
    CouponsComponent,
    CouponComponent,
    ConfigsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicModule {}
