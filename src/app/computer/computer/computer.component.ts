import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../computer.service';
import {ActivatedRoute} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Computer} from '../computer.model';

@Component({
  selector: 'cdb-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {

  private _computer: Computer;
  private _editDialog: MatDialogRef<DialogComponent>;

  constructor(private computerService: ComputerService, private route: ActivatedRoute, private _dialog: MatDialog) {

  }

  ngOnInit() {
    console.log('oninit');
    this.computerService.getById(this.route.snapshot.paramMap.get('id')).subscribe(_ => {
      this._computer = new Computer(_);
      console.log(this.computer);
    });
  }

  get computer(): Computer {
    return this._computer;
  }

  editDialog() {
    // open modal
    this._editDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: this._computer
    });

    // subscribe to afterClosed observable to do process
    this._editDialog.afterClosed()
      .subscribe(
        (_: any) => console.log(_)
      );
  }

}
