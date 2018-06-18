import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
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
  pageInfo: PageEvent;
  pageSizeOptions = [10, 15, 20];

  pageEvent(pageInfo: PageEvent) {
    this.loadContent({ 'page' : pageInfo.pageIndex + 1, 'limit' : pageInfo.pageSize});
    this.pageInfo = pageInfo;
  }

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.loadContent({});
  }

  loadContent({page = 1, limit = 10}) {
    this.companyService.get({page, limit}).subscribe( springDataPage => {
      this.companies = new Page(springDataPage);
      this.pageInfo = {
        'pageIndex' : page - 1,
        'pageSize' : limit,
        'length' : this.companies.totalElements
      };
      console.log(this.pageInfo);
    });
  }

}
