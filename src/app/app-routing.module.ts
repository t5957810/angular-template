import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: './feature/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'css',
        loadChildren: './feature/css-design/css-design.module#CssDesignModule'
      },
      {
        path: 'charts',
        loadChildren: './feature/charts/charts.module#ChartsModule'
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
