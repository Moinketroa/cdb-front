import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Page } from '../../page.model';
import { Router, ActivatedRoute } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AppService } from '../../app.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'cdb-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  animations: [
    trigger('Animation', [
      state('init', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => init', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      state('right', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => right', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      state('left', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => left', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ])
    ])
  ]
})
export class CompaniesComponent implements OnInit, AfterViewChecked {
  companies: Page<Company>;
  pageInfo: PageEvent;
  pageSizeOptions = [15, 20, 30];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchControl: FormControl;
  filteredCompanies$: Observable<Company[]>;

  transition = 'init';

  pageEvent(pageInfo: PageEvent) {
    if (pageInfo.pageSize !== this.pageInfo.pageSize) {
      this.transition = 'init';
    } else {
      this.transition =
        this.pageInfo.pageIndex > pageInfo.pageIndex ? 'left' : 'right';
    }
    this.router.navigateByUrl(
      this.isInFilterMode() ?
      `/company/page/${pageInfo.pageIndex + 1}/limit/${pageInfo.pageSize}`
      : `/company/search/${this.readSearchParameter()}/page/${pageInfo.pageIndex + 1}/limit/${pageInfo.pageSize}`
    );
    this.loadContent(pageInfo.pageIndex + 1, pageInfo.pageSize);
    this.pageInfo = pageInfo;
  }

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.appService.changeTitle('Companies');
    this.searchControl.valueChanges.subscribe( searchedKeywords => {
      if (searchedKeywords.length > 2) {
        companyService.search({page: 1, limit: 5}, searchedKeywords)
        .subscribe(springDataPage => {
          this.filteredCompanies$ = of(new Page<Company>(springDataPage).content);
        });
      } else {
        this.filteredCompanies$ = undefined;
      }
    });
  }

  submitSearch() {
    if (this.searchControl.valid) {
      if ( typeof this.searchControl.value === 'string') {
        this.router.navigateByUrl(
          `/company/search/${ this.searchControl.value }`
        );
      } else {
        this.router.navigateByUrl(
          `/company/edit/${ this.searchControl.value.id }`
        );
      }
    }
  }

  displayFn(company?: Company): string | undefined {
    return company ? company.name : undefined;
  }

  private readPageParameter() {
    const page = this.route.snapshot.paramMap.get('page');
    return page === null ? 1 : +page;
  }

  private readSearchParameter(): string {
    return this.route.snapshot.paramMap.get('search');
  }

  isInFilterMode() {
    return this.readSearchParameter() && this.readSearchParameter().length > 0;
  }

  ngOnInit() {
    let limit = +this.route.snapshot.paramMap.get('limit');
    if (this.pageSizeOptions.indexOf(limit) === -1) {
      limit = this.pageSizeOptions[0];
    }
    this.loadContent(this.readPageParameter(), limit);
  }

  ngAfterViewChecked() {
    if (this.paginator != null) {
      if (this.pageInfo != null) {
        this.paginator._pageIndex = this.pageInfo.pageIndex;
      } else {
        this.paginator._pageIndex = this.readPageParameter();
      }
    }
  }

  loadContent(page, limit) {
    const usedService = this.isInFilterMode()
    ? this.companyService.search({page, limit}, this.readSearchParameter())
    : this.companyService.get({ page, limit });
    usedService.subscribe(springDataPage => {
      this.companies = new Page<Company>(springDataPage);
      this.pageInfo = {
        pageIndex: page - 1,
        pageSize: limit,
        length: this.companies.totalElements
      };
    });
  }
}
