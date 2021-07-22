import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SharedModule } from './shared/components/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, InicioComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
