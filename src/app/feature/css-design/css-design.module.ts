import { NgModule } from '@angular/core';

import { CssDesignRoutingModule } from './css-design-routing.module';
import { CssDesignComponent } from './css-design/css-design.component';
import { CommonSharedModule } from 'src/app/shared/modules/common-shared/common-shared.module';

@NgModule({
  declarations: [CssDesignComponent],
  imports: [
    CommonSharedModule,
    CssDesignRoutingModule
  ]
})
export class CssDesignModule { }
