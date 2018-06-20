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
import {ComputerAddComponent} from './computer/computer-add/computer-add.component';
import {ComputerEditComponent} from './computer/computer-edit/computer-edit.component';
import {ComputerComponent} from './computer/computer/computer.component';
import {ComputersComponent} from './computer/computers/computers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'company/add', component: CompanyAddComponent},
  { path: 'company/edit/:id', component: CompanyEditComponent},
  { path: 'company/:id', component: CompanyComponent},
  { path: 'company/search/:search', component: CompaniesComponent},
  { path: 'company', component: CompaniesComponent},
  { path: 'computer/add', component: ComputerAddComponent},
  { path: 'computer/edit/:id', component: ComputerEditComponent},
  { path: 'computer/:id', component: ComputerComponent},
  { path: 'computer/search/:search', component: ComputersComponent},
  { path: 'computer', component: ComputersComponent},
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
