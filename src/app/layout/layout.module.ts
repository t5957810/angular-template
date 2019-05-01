import { NgModule } from '@angular/core';

import { LayoutComponent } from './components/layout/layout.component';
import { CommonSharedModule } from '../shared/modules/common-shared/common-shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    MenuComponent
  ],
  imports: [
    CommonSharedModule,
    RouterModule // 為了使用routerLink
  ]
})
export class LayoutModule {}
