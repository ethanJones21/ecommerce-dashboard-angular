import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxTinymceModule } from 'ngx-tinymce';
import { InventoryComponent } from './products/inventory/inventory.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponComponent } from './coupons/coupon/coupon.component';
import { GaleryComponent } from './products/galery/galery.component';
import { VarietiesComponent } from './products/varieties/varieties.component';
import { MessagesComponent } from './messages/messages.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    PublicComponent,
    ProductsComponent,
    ProductComponent,
    InventoryComponent,
    CouponsComponent,
    CouponComponent,
    GaleryComponent,
    VarietiesComponent,
    MessagesComponent,
    OrdersComponent,
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
    PublicComponent,
    ProductsComponent,
    ProductComponent,
    InventoryComponent,
    CouponsComponent,
    CouponComponent,
    VarietiesComponent,
    MessagesComponent,
    OrdersComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicModule {}
