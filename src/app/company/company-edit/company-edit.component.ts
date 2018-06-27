import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig
} from '@angular/material';
import { AppService } from '../../app.service';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { ComputerService } from '../../computer/computer.service';
import { Computer } from '../../computer/computer.model';

@Component({
  selector: 'cdb-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  editForm: FormGroup;
  snackBarOptions: MatSnackBarConfig;
  company: Company;
  displayedColumns = ['name', 'introduced', 'discontinued', 'supprimer'];
  private _nameMaxLength = 250;
  private _descMaxLength = 1000;

  constructor(
    private companyService: CompanyService,
    private computerService: ComputerService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private appService: AppService
  ) {
    this.appService.changeTitle('Company Edition');
    const hp: MatSnackBarHorizontalPosition = 'center';
    const vp: MatSnackBarVerticalPosition = 'top';
    this.snackBarOptions = {
      duration: 1500,
      horizontalPosition: hp,
      verticalPosition: vp
    };
  }

  get nameMaxLength(): number {
    return this._nameMaxLength;
  }

  get descMaxLength(): number {
    return this._descMaxLength;
  }

  get image(): string {
    if (this.editForm.get('image').value != null) {
      return this.editForm.get('image').value;
    } else {
      return 'http://demo.makitweb.com/broken_image/images/noimage.png';
    }
  }

  ngOnInit() {
    this.companyService
      .getById(this.route.snapshot.paramMap.get('id'))
      .subscribe(company => {
        this.company = new Company(company);
        this.editForm = new FormGroup({
          name: new FormControl(this.company.name, [Validators.required, Validators.maxLength(this._nameMaxLength)]),
          id: new FormControl(this.company.id, Validators.required),
          description: new FormControl(this.company.description, Validators.maxLength(this._descMaxLength)),
          image: new FormControl(this.company.image, Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)'))
        });
      });
  }

  submit() {
    if (this.editForm.valid) {
      this.company = this.editForm.value;
      this.companyService
        .update(this.company)
        .subscribe(
          isSuccess => {
            this.router.navigate(['/company/details/', this.company.id]).catch();
            isSuccess ? this.successSnackBar() : this.oupsieSnackBar();
          });
    }
  }

  delete(id: number) {
    this.computerService
      .delete(id)
      .subscribe(
        isSuccess => {
          if (isSuccess) {
            this.successSnackBar();
            this.ngOnInit();
          } else {
            this.oupsieSnackBar();
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
