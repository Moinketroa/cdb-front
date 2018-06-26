import { Component, OnInit } from '@angular/core';
import {ComputerService} from '../computer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material';
import {Computer} from '../computer.model';

@Component({
  selector: 'cdb-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {

  private _computer: Computer;
  private _editDialog: MatDialogRef<DialogComponent>;
  private _confirmDialog: MatDialogRef<DialogComponent>;
  private snackBarOptions: MatSnackBarConfig;

  constructor(
    private computerService: ComputerService,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const hp: MatSnackBarHorizontalPosition = 'center';
    const vp: MatSnackBarVerticalPosition = 'top';
    this.snackBarOptions = {
      duration: 1500,
      horizontalPosition: hp,
      verticalPosition: vp
    };
  }

  ngOnInit() {
    this.computerService.getById(this.route.snapshot.paramMap.get('id')).subscribe(computer => {
      this._computer = new Computer(computer);
    });
  }

  get computer(): Computer {
    return this._computer;
  }

  editDialog() {
    // open modal
    this._editDialog = this._dialog.open(DialogComponent, {
      width: '40vw',
      disableClose: true,
      data: this._computer
    });

    // subscribe to afterClosed observable to do process
    this._editDialog.afterClosed()
      .subscribe(
        (computer: any) => {
          if (computer) {
            this.computerService.update(computer).subscribe(
              _ => this.computerService.getById(this._computer.id + '').subscribe(
                newComputer => this._computer = new Computer(newComputer)
              )
            );
          }
        });
  }

  delete() {
    // open modal
    this._editDialog = this._dialog.open(DialogComponent, {
      width: '20vw',
      disableClose: true,
      data: 'Confirm'
    });

    this._editDialog.afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.router.navigate(['/computer']);
          this.computerService.delete(this._computer.id).subscribe(
            isSuccess => isSuccess === 1 ? this.successSnackBar() : this.oupsieSnackBar()
          );
        }
      });
  }

  successSnackBar() {
    this.snackBar.open('Success', undefined, {
      ...this.snackBarOptions,
      panelClass: 'successSnackBar'
    });
  }
  oupsieSnackBar() {
    this.snackBar.open('Oupsie', undefined, {
      ...this.snackBarOptions,
      panelClass: 'oupsieSnackBar'
    });
  }

}
