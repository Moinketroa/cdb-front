import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatInputModule, MatTableModule, MatSortModule,
  MatSnackBarModule,
  MatIconModule, MatMenuModule, MatAutocompleteModule
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule
  ],
  declarations: []
})
export class CustomMaterialModule {}
