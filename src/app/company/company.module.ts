import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CustomUtilModule } from '../custom-util/custom-util.module';
import { CompanyComponent } from './company/company.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyAddComponent,
    CompanyEditComponent
  ]
})
export class CompanyModule {}
