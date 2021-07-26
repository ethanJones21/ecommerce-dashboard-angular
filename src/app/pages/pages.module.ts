import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './inicio/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/components/shared.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ClientsComponent,
    ClientComponent,
    ProductsComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    ClientsComponent,
    ClientComponent,
    ProductsComponent,
    ProductComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
