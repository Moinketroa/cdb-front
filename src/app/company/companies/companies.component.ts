import {
  Component,
  OnInit,
  ViewChild,
  AfterViewChecked,
  AfterContentInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {PageEvent, MatPaginator, MatDialog, MatDialogRef} from '@angular/material';
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
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';
import {DialogComponent} from '../../dialog/dialog.component';
import {Computer} from '../../computer/computer.model';
@Component({
  selector: 'cdb-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  animations: [
    trigger('Animation', [
      state('init', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => init', [
        style({
          opacity: 0,
          transform: 'translateY(-10%)'
        }),
        animate('0.3s ease-in')
      ]),
      state('right', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => right', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      state('left', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => left', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ])
    ])
  ]
})
export class CompaniesComponent implements OnInit, AfterContentInit, AfterViewChecked, AfterViewInit {
  companies: Page<Company>;
  pageInfo: PageEvent;
  pageSizeOptions = [15, 50, 100];
  activeSort: string;
  readonly SORTS = {
    BY_NAME: 'BY_NAME',
    BY_NAME_DESC: 'BY_NAME_DESC'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') searchInput: ElementRef;

  searchControl = new FormControl();
  sortControl: FormControl;
  filteredCompanies$: Observable<Company[]>;

  private _addDialog: MatDialogRef<DialogComponent>;

  transition: string;

  pageEvent(pageInfo: PageEvent) {
    if (pageInfo.pageSize !== this.pageInfo.pageSize) {
      this.transition = 'init';
    } else {
      this.transition =
        this.pageInfo.pageIndex > pageInfo.pageIndex ? 'left' : 'right';
    }
    let url: string;
    if (this.isInFilterMode()) {
      url = `/company/search/${this.readSearchParameter()}`;
      if (this.activeSort !== this.SORTS.BY_NAME) {
        url += `/${this.activeSort}`;
      }
    } else {
      url = '/company';
      if (this.activeSort !== this.SORTS.BY_NAME) {
        url += `/order/${this.activeSort}`;
      }
    }
    const addLimit = pageInfo.pageSize !== this.pageSizeOptions[0];
    if (pageInfo.pageIndex > 0 || addLimit) {
      url += `/page/${pageInfo.pageIndex + 1}`;
      if (addLimit) {
        url += `/limit/${pageInfo.pageSize}`;
      }
    }
    this.router.navigateByUrl(url + `?transition=${this.transition}`);
    this.loadContent(pageInfo.pageIndex + 1, pageInfo.pageSize);
    this.pageInfo = pageInfo;
  }

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.searchControl.valueChanges.subscribe( searchedKeywords => {
      if ( !isNullOrUndefined(searchedKeywords) && searchedKeywords.length > 2) {
        this.companyService.search({page: 1, limit: 5}, searchedKeywords, this.activeSort)
        .subscribe(springDataPage => {
          this.filteredCompanies$ = of(new Page<Company>(springDataPage).content);
        });
      } else {
        this.filteredCompanies$ = undefined;
      }
    });
    this.activeSort = this.route.snapshot.paramMap.get('sort');
    if (isNullOrUndefined(this.activeSort) || Object.values(this.SORTS).indexOf(this.activeSort) === -1) {
      this.activeSort = this.SORTS.BY_NAME;
    }
    this.sortControl = new FormControl(this.activeSort);
    this.sortControl.valueChanges.subscribe( activatedSort => {
      this.router.navigateByUrl('/company/' +
      (this.isInFilterMode() ? `search/${this.readSearchParameter()}/` : 'order/') +
      `${activatedSort}/page/1/limit/${this.pageInfo.pageSize}`);
      this.loadContent(this.readPageParameter(), limit);
    });
    let limit = +this.route.snapshot.paramMap.get('limit');
    if (this.pageSizeOptions.indexOf(limit) === -1) {
      limit = this.pageSizeOptions[0];
    }
    this.transition = this.route.snapshot.queryParams['transition'] || 'init';
    this.loadContent(this.readPageParameter(), limit);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.appService.changeTitle('HOME.COMPANY.NAME');
    });
  }

  ngAfterViewInit() {
    if (!isNullOrUndefined(this.searchInput) && this.searchInput.nativeElement.value.length === 0 && this.isInFilterMode()) {
      setTimeout(() => {
        this.searchInput.nativeElement.value = this.readSearchParameter();
      });
    }
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

  submitSearch() {
    if (this.searchControl.valid) {
      if ( typeof this.searchControl.value === 'string') {
        this.router.navigateByUrl(
          this.searchControl.value.length > 0 ?
          `/company/search/${ this.searchControl.value }`
          : `/company/page/1/limit/${ this.pageInfo.pageSize }`
        );
        this.loadContent(1, this.pageInfo.pageSize, this.searchControl.value);
      } else if ( this.searchControl.value.id ) {
        this.router.navigateByUrl(
          `/company/details/${ this.searchControl.value.id }`
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
    return this.readSearchParameter() != null;
  }

  loadContent(page, limit, searchedKeywords?: string) {
    if (isNullOrUndefined(searchedKeywords)) {
      searchedKeywords = this.readSearchParameter();
    }
    const usedService = this.isInFilterMode()
    ? this.companyService.search({page, limit}, searchedKeywords, this.activeSort)
    : this.companyService.get({ page, limit }, this.activeSort);
    usedService.subscribe(springDataPage => {
      this.companies = new Page<Company>(springDataPage);
      this.pageInfo = {
        pageIndex: page - 1,
        pageSize: limit,
        length: this.companies.totalElements
      };
    });
  }

  showDialog() {
    // open modal
    this._addDialog = this._dialog.open(DialogComponent, {
      width: '40vw',
      disableClose: true,
      data: new Company()
    });

    // subscribe to afterClosed observable to do process
    this._addDialog.afterClosed()
      .subscribe(
        (company: any) => {
          if (company) {
            this.companyService.add(company).subscribe(
              id => this.router.navigate(['/company/details/', id])
            );
          }
        });
  }
}
