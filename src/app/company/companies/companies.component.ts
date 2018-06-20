import { Component, OnInit, ViewChild, AfterContentInit, AfterViewChecked } from '@angular/core';
import {PageEvent, MatPaginator} from '@angular/material';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Page } from '../../page.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'cdb-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit, AfterViewChecked {

  companies: Page<Company>;
  pageInfo: PageEvent;
  pageSizeOptions = [15, 20, 30];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  pageEvent(pageInfo: PageEvent) {
    this.loadContent(pageInfo.pageIndex + 1, pageInfo.pageSize);
    this.pageInfo = pageInfo;
    this.router.navigateByUrl(`/company/page/${pageInfo.pageIndex + 1}/limit/${pageInfo.pageSize}`, );
  }

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute) { }

  private readPageParameter() {
    const page = this.route.snapshot.paramMap.get('page');
    return page === null ? 1 : +page;
  }

  ngOnInit() {
    let limit = +this.route.snapshot.paramMap.get('limit');
    if (this.pageSizeOptions.indexOf(limit) === -1) {
      limit = this.pageSizeOptions[0];
    }
    this.loadContent(this.readPageParameter(), limit);
  }

  ngAfterViewChecked() {
    if ( this.paginator != null) {
      if (this.pageInfo != null) {
        this.paginator._pageIndex = this.pageInfo.pageIndex;
      } else {
        this.paginator._pageIndex = this.readPageParameter();
      }
    }
  }

  loadContent(page, limit) {
    this.companyService.get({page, limit}).subscribe( springDataPage => {
      this.companies = new Page(springDataPage);
      this.pageInfo = {
        'pageIndex' : page - 1,
        'pageSize' : limit,
        'length' : this.companies.totalElements
      };
    });
  }

}
