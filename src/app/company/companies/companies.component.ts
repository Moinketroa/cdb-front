import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'cdb-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companies = [
      {
        'id' : 1,
        'name' : 'Foo'
      },
      {
        'id' : 2,
        'name' : 'Boo'
      },
      {
        'id' : 3,
        'name' : 'Too'
      }
    ];
  }

}
