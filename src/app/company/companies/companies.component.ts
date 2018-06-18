import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Page } from '../../page.model';

@Component({
  selector: 'cdb-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Page<Company>;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanies({'page': 1, 'limit': 10}).subscribe( springDataPage => {
      this.companies = new Page(springDataPage);
    });
  }

}
