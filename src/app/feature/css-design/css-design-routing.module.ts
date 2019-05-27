import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CssDesignComponent } from './css-design/css-design.component';

const routes: Routes = [
  {
    path: '',
    component: CssDesignComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CssDesignRoutingModule { }
