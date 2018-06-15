import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserModule} from './user/user.module';
import {ComputerModule} from './computer/computer.module';
import {CompanyModule} from './company/company.module';
import {LoginComponent} from './user/login/login.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyComponent } from './company/company/company.component';
import { CompaniesComponent } from './company/companies/companies.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'company/add', component: CompanyAddComponent},
  { path: 'company/edit/:id', component: CompanyEditComponent},
  { path: 'company/:id', component: CompanyComponent},
  { path: 'company/search/:search', component: CompaniesComponent},
  { path: 'company/search/:search/page/:page', component: CompaniesComponent},
  { path: 'company/search/:search/page/:page/limit/:limit', component: CompaniesComponent},
  { path: 'company', component: CompaniesComponent},
  { path: 'company/page/:page', component: CompaniesComponent},
  { path: 'company/page/:page/limit/:limit', component: CompaniesComponent},
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
