import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { SkeletonTableLoadComponent } from './components/skeleton-table-load/skeleton-table-load.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoadingComponent, SkeletonTableLoadComponent],
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [LoadingComponent, SkeletonTableLoadComponent],
})
export class SharedModule {}
