import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DiscontinuedDatePipe} from './pipe/discontinued-date.pipe';
import {IntroducedDatePipe} from './pipe/introduced-date.pipe';
import {CompanyPipe} from './pipe/company.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DiscontinuedDatePipe,
    IntroducedDatePipe,
    CompanyPipe
  ],
  declarations: [
    DiscontinuedDatePipe,
    IntroducedDatePipe,
    CompanyPipe
  ]
})
export class CustomUtilModule { }
