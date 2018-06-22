import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {CustomUtilModule} from '../custom-util/custom-util.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule,
    FormsModule
  ],
  declarations: [LoginComponent, InscriptionComponent]
})
export class UserModule { }
