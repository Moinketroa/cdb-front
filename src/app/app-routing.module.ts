import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, CanActivate } from '@angular/router';
import {UserModule} from './user/user.module';
import {ComputerModule} from './computer/computer.module';
import {CompanyModule} from './company/company.module';
import {LoginComponent} from './user/login/login.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyComponent } from './company/company/company.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'company/add', component: CompanyAddComponent, canActivate: [AuthGuardService]},
  { path: 'company/edit/:id', component: CompanyEditComponent, canActivate: [AuthGuardService]},
  { path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/page/:page', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/page/:page/limit/:limit', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/page/:page', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/page/:page/limit/:limit', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    ComputerModule,
    CompanyModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
