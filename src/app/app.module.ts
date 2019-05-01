import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { ChartsModule } from './feature/charts/charts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LayoutModule,
    AppRoutingModule,         // AppRouting必須放在最後載入
    BrowserModule,
    HttpClientModule,         // import HttpClientModule after BrowserModule.
    BrowserAnimationsModule, ChartsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
