import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingComponent } from './loading/loading.component';
import { SkeletonTableLoadComponent } from './skeleton-table-load/skeleton-table-load.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LoadingComponent,
    SkeletonTableLoadComponent,
  ],
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [
    SidebarComponent,
    NavbarComponent,
    LoadingComponent,
    SkeletonTableLoadComponent,
  ],
})
export class SharedModule {}
