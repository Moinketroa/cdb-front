import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { ComputerModule } from './computer/computer.module';
import { CompanyModule } from './company/company.module';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { CustomUtilModule } from './custom-util/custom-util.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './http-interceptor';
import {DialogModule} from './dialog/dialog.module';
import { UserService } from './user/user.service';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function gettoken() {
  return localStorage.getItem(UserService.token_key);
}

const jwtConf: JwtModuleOptions = {
  config: {
    tokenGetter: gettoken,
    whitelistedDomains: ['localhost']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CustomUtilModule,
    CustomMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    ComputerModule,
    CompanyModule,
    DialogModule,
    JwtModule.forRoot(jwtConf)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
