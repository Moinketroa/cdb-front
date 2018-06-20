import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
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
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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

  myControl = new FormControl();
  filteredOptions: Observable<Company[]>;
  options = [
    {id: 1, name: 'Foo'},
    {id: 2, name: 'Boo'}
  ];

  transition = 'init';

  pageEvent(pageInfo: PageEvent) {
    this.loadContent(pageInfo.pageIndex + 1, pageInfo.pageSize);
    if (pageInfo.pageSize !== this.pageInfo.pageSize) {
      this.transition = 'init';
    } else {
      this.transition =
        this.pageInfo.pageIndex > pageInfo.pageIndex ? 'left' : 'right';
    }
    this.pageInfo = pageInfo;
    this.router.navigateByUrl(
      `/company/page/${pageInfo.pageIndex + 1}/limit/${pageInfo.pageSize}`
    );
  }

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.appService.changeTitle('Companies');
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith<string | Company>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this.filter(name) : this.options.slice())
    );
  }

  filter(name: string): Company[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(company?: Company): string | undefined {
    return company ? company.name : undefined;
  }

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
    if (this.paginator != null) {
      if (this.pageInfo != null) {
        this.paginator._pageIndex = this.pageInfo.pageIndex;
      } else {
        this.paginator._pageIndex = this.readPageParameter();
      }
    }
  }

  loadContent(page, limit) {
    this.companyService.get({ page, limit }).subscribe(springDataPage => {
      this.companies = new Page(springDataPage);
      this.pageInfo = {
        pageIndex: page - 1,
        pageSize: limit,
        length: this.companies.totalElements
      };
    });
  }
}
