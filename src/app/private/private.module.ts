import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private.components';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
@NgModule({
  declarations: [
    ClientsComponent,
    ClientComponent,
    SettingsComponent,
    HomeComponent,
    PrivateComponent,
    UsersComponent,
    UserComponent,
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
    SettingsComponent,
    HomeComponent,
    PrivateComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivateModule {}
