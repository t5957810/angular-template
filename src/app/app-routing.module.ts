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
        loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'css',
        loadChildren: () => import('./feature/css-design/css-design.module').then(m => m.CssDesignModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./feature/charts/charts.module').then(m => m.ChartsModule)
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
