import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {CustomUtilModule} from '../custom-util/custom-util.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule
  ],
  declarations: [LoginComponent]
})
export class UserModule { }
