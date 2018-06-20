import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatInputModule,
  MatSnackBarModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule
  ],
  declarations: []
})
export class CustomMaterialModule {}
