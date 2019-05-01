import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonSharedModule } from '../../shared/modules/common-shared/common-shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonSharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
