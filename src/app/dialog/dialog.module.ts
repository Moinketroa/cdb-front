import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomUtilModule} from '../custom-util/custom-util.module';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {DialogComponent} from './dialog.component';
import {ComputerFormComponent} from './computer-form/computer-form.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CustomUtilModule
  ],
  entryComponents: [DialogComponent],
  declarations: [DialogComponent, ComputerFormComponent]
})
export class DialogModule { }
