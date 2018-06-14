import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CustomMaterialModule} from './custom-material/custom-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from './user/user.module';
import {ComputerModule} from './computer/computer.module';
import {CompanyModule} from './company/company.module';
import {HttpClientModule} from '@angular/common/http';
import {CustomUtilModule} from './custom-util/custom-util.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomUtilModule,
    CustomMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    ComputerModule,
    CompanyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
