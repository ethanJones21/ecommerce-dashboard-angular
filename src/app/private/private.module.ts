import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ConfigsComponent } from './configs/configs.component';
import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private.components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    ConfigsComponent,
    HomeComponent,
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgxTinymceModule.forRoot({
      baseURL: './assets/tinymce/',
    }),
  ],
  exports: [
    ClientsComponent,
    ClientComponent,
    ConfigsComponent,
    HomeComponent,
    PrivateComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivateModule {}
