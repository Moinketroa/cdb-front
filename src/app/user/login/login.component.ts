import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../company/company.service';

@Component({
  selector: 'cdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _companyService: CompanyService) {
    this._companyService.getCompanies().subscribe(_ => console.log(_));
  }

  ngOnInit() {
  }

}
