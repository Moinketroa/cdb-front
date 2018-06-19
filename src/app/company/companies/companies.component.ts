import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Page } from '../../page.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'cdb-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  animations: [
    trigger('Animation', [
      state('init', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => init', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      state('right', style({opacity: 1, transform: 'translateX(0)'})),
      transition('* => right', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      state('left', style({opacity: 1, transform: 'translateX(0)'})),
      transition('* => left', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
    ])
  ]
})
export class CompaniesComponent implements OnInit {

  companies: Page<Company>;
  pageInfo: PageEvent;
  pageSizeOptions = [10, 15, 20];
  transition = 'init';

  pageEvent(pageInfo: PageEvent) {
    this.loadContent({ 'page' : pageInfo.pageIndex + 1, 'limit' : pageInfo.pageSize});
    if (pageInfo.pageSize !== this.pageInfo.pageSize) {
      this.transition = 'init';
    } else {
      this.transition = this.pageInfo.pageIndex > pageInfo.pageIndex ? 'left' : 'right';
    }
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
    });
  }

}
