import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'cdb-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  editForm: FormGroup;
  snackBarOptions: MatSnackBarConfig;
  expanded: boolean;
  company: Company;

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

  ngOnInit() {
    this.companyService
      .getById(this.route.snapshot.paramMap.get('id'))
      .subscribe(company => {
        this.company = company;
        this.editForm = new FormGroup({
          name: new FormControl(this.company.name, Validators.required),
          id: new FormControl(this.company.id, Validators.required),
          description: new FormControl(this.company.description),
          image: new FormControl(this.company.description)
        });
      });
  }

  submit() {
    if (this.editForm.valid) {
      this.company = this.editForm.value;
      this.companyService
        .update(this.company)
        .subscribe(
          isSuccess =>
            isSuccess ? this.successSnackBar() : this.oupsieSnackBar()
        );
        const id = this.route.snapshot.paramMap.get('id');
        this.router.navigate(['/company/details/', id]).catch();
    }
  }

  delete(id: number) {
    this.computerService.delete(id).subscribe();
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

  voirComputers() {
    this.expanded = true;
  }
  cacherComputers() {
    this.expanded = false;
  }
}
