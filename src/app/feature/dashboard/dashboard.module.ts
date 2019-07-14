import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonSharedModule } from '../../shared/modules/common-shared/common-shared.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { ToggleComponent } from './toggle/toggle.component';
import { MenuComponent } from './menu/menu.component';
import { CardComponent } from './card/card.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [DashboardComponent, CheckboxComponent, RadioComponent, SelectComponent, ToggleComponent, MenuComponent, CardComponent, PanelComponent],
  imports: [
    CommonSharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
