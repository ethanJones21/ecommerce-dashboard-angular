import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { SkeletonTableLoadComponent } from './components/skeleton-table-load/skeleton-table-load.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NormalizedHorizontalBarChartComponent } from './components/normalized-horizontal-bar-chart/normalized-horizontal-bar-chart.component';
import { StackedAreaChartComponent } from './components/stacked-area-chart/stacked-area-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    LoadingComponent,
    // SkeletonTableLoadComponent,
    PaginationComponent,
    NavbarComponent,
    SidebarComponent,
    NormalizedHorizontalBarChartComponent,
    StackedAreaChartComponent,
    PieChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxChartsModule,
    // NgxSkeletonLoaderModule
  ],
  exports: [
    LoadingComponent,
    // SkeletonTableLoadComponent,
    PaginationComponent,
    NavbarComponent,
    SidebarComponent,
    NormalizedHorizontalBarChartComponent,
    StackedAreaChartComponent,
    PieChartComponent,
  ],
})
export class SharedModule {}
