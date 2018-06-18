import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../company/company.service';

@Component({
  selector: 'cdb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _companyService: CompanyService) {
    this._companyService.get({}).subscribe(_ => console.log(_));
  }

  ngOnInit() {
  }

}
