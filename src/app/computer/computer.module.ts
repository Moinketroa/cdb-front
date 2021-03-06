import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {CustomUtilModule} from '../custom-util/custom-util.module';
import { ComputerComponent } from './computer/computer.component';
import { ComputersComponent } from './computers/computers.component';
import { ComputerDetailComponent } from './computer-detail/computer-detail.component';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import { ComputerEditComponent } from './computer-edit/computer-edit.component';
import {DiscontinuedDatePipe} from '../custom-util/pipe/discontinued-date.pipe';
import {IntroducedDatePipe} from '../custom-util/pipe/introduced-date.pipe';
import { CompanyPipe } from '../custom-util/pipe/company.pipe';
import {DialogModule} from '../dialog/dialog.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComputerComponent,
    ComputersComponent,
    ComputerDetailComponent,
    ComputerAddComponent,
    ComputerEditComponent
  ]
})
export class ComputerModule { }
