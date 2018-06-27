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
import {ComputerAddComponent} from './computer/computer-add/computer-add.component';
import {ComputerComponent} from './computer/computer/computer.component';
import {ComputersComponent} from './computer/computers/computers.component';
import {ComputerEditComponent} from './computer/computer-edit/computer-edit.component';
import {InscriptionComponent} from './user/inscription/inscription.component';
import { AuthGuardService } from './auth-guard.service';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: InscriptionComponent },
  { path: 'computer/add', component: ComputerAddComponent, canActivate: [AuthGuardService]},
  { path: 'computer/edit/:id', component: ComputerEditComponent, canActivate: [AuthGuardService]},
  { path: 'computer/:id', component: ComputerComponent, canActivate: [AuthGuardService]},
  { path: 'computer/search/:search', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/search/:search/page/:page', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/search/:search/page/:page/limit/:limit', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/page/:page', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/page/:page/limit/:limit', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/order/:sort', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/order/:sort/page/:page', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/order/:sort/page/:page/limit/:limit', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/search/:search/:sort', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/search/:search/:sort/page/:page', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer/search/:search/:sort/page/:page/limit/:limit', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'computer', component: ComputersComponent, canActivate: [AuthGuardService]},
  { path: 'company/add', component: CompanyAddComponent, canActivate: [AuthGuardService]},
  { path: 'company/details/:id', component: CompanyDetailComponent, canActivate: [AuthGuardService]},
  { path: 'company/edit/:id', component: CompanyEditComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/page/:page', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/page/:page/limit/:limit', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/page/:page', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/page/:page/limit/:limit', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/order/:sort', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/order/:sort/page/:page', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/order/:sort/page/:page/limit/:limit', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/:sort', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/:sort/page/:page', component: CompaniesComponent, canActivate: [AuthGuardService]},
  { path: 'company/search/:search/:sort/page/:page/limit/:limit', component: CompaniesComponent, canActivate: [AuthGuardService]},
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
