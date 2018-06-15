import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {CustomUtilModule} from '../custom-util/custom-util.module';
import { ComputerComponent } from './computer/computer.component';
import { ComputersComponent } from './computers/computers.component';
import { ComputerDetailComponent } from './computer-detail/computer-detail.component';
import { ComputerAddComponent } from './computer-add/computer-add.component';
import { ComputerEditComponent } from './computer-edit/computer-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule
  ],
  declarations: [ComputerComponent, ComputersComponent, ComputerDetailComponent, ComputerAddComponent, ComputerEditComponent]
})
export class ComputerModule { }
