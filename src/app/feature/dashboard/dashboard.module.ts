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
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BottomSheetOverviewSheetComponent } from './bottom-sheet/bottom-sheet-overview-sheet/bottom-sheet-overview-sheet.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './alert-dialog/confirm-dialog/confirm-dialog.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    ToggleComponent,
    MenuComponent,
    CardComponent,
    PanelComponent,
    BottomSheetComponent,
    BottomSheetOverviewSheetComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    ButtonComponent
  ],
  entryComponents: [
    BottomSheetOverviewSheetComponent,
    ConfirmDialogComponent
  ],
  imports: [CommonSharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
