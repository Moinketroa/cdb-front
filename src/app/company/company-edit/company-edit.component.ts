import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cdb-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent  implements OnInit {

  editForm: FormGroup;

  company: Company;

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.company = {
      id: 1,
      name: 'Foo'
    };
    this.editForm = new FormGroup({
      name : new FormControl(
        this.company.name, Validators.required
      ),
      id : new FormControl(
        this.company.id, Validators.required
      )});
  }

  submit() {
    if (this.editForm.valid) {
      console.log(this.company);
      this.snackBar.open('Success', undefined, {
        duration: 1500,
      });
    }
  }

}
