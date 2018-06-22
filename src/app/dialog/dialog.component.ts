import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Computer} from '../computer/computer.model';
import {Company} from '../company/company.model';

@Component({
  selector: 'cdb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) {
  }

  ngOnInit() {
  }

  get data(): any {
    return this._data;
  }

  get isDataComputer(): boolean {
    return this._data instanceof Computer;
  }

  get isDataCompany(): boolean {
    return this._data instanceof Company;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSubmit(model: Computer | Company) {
    this._dialogRef.close(model);
  }
}
