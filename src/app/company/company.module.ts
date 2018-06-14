import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {CustomUtilModule} from '../custom-util/custom-util.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule
  ],
  declarations: []
})
export class CompanyModule { }
