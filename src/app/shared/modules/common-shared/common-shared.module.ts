import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../primeNG/primeng.module';
import { SafeHtmlPipe } from '../../Pipes/safeHtmlPipe';
import { ConfirmDialogComponent } from 'src/app/layout/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SafeHtmlPipe
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  imports: [
    PrimeNgModule,
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AngularMaterialModule,
    PrimeNgModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SafeHtmlPipe
  ]
})
export class CommonSharedModule { }
