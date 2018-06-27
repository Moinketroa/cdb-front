import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, DoCheck} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Computer} from '../computer.model';
import {Page} from '../../page.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../app.service';
import {ComputerService} from '../computer.service';
import {MatDialog, MatDialogRef, PageEvent, MatPaginator} from '@angular/material';
import {DialogComponent} from '../../dialog/dialog.component';
import {isNullOrUndefined} from 'util';
import {Observable, of} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'cdb-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss'],
  animations: [
    trigger('Animation', [
      state('init', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => init', [
        style({
          opacity: 0,
          transform: 'translateY(-10%)'
        }),
        animate('0.4s ease-in')
      ]),
      state('right', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => right', [
        style({
          opacity: 0,
          transform: 'translateX(80%)'
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
export class ComputersComponent implements OnInit, AfterContentInit, AfterViewChecked, AfterViewInit {

  computers: Page<Computer>;
  pageInfo: PageEvent;
  transition = 'init';
  pageSizeOptions = [15, 50, 100];
  activeSort: string;
  readonly SORTS = {
    BY_NAME: 'BY_NAME',
    BY_NAME_DESC: 'BY_NAME_DESC',
    BY_INTRODUCED: 'BY_INTRODUCED_DATE',
    BY_INTRODUCED_DESC: 'BY_INTRODUCED_DATE_DESC',
    BY_DISCONTINUED: 'BY_DISCONTINUED_DATE',
    BY_DISCONTINUED_DESC: 'BY_DISCONTINUED_DATE_DESC'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') searchInput: ElementRef;

  private _addDialog: MatDialogRef<DialogComponent>;
  searchControl = new FormControl();
  sortControl: FormControl;
  filteredComputers$: Observable<Computer[]>;

  constructor(
    private computerService: ComputerService,
    private router: Router,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.appService.changeTitle('HOME.COMPUTER.NAME');
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe( searchedKeywords => {
      if ( !isNullOrUndefined(searchedKeywords) && searchedKeywords.length > 2) {
        this.computerService.search({page: 1, limit: 5}, searchedKeywords, this.activeSort)
          .subscribe(springDataPage => {
            this.filteredComputers$ = of(new Page<Computer>(springDataPage).content);
          });
      } else {
        this.filteredComputers$ = undefined;
      }
    });
    this.activeSort = this.route.snapshot.paramMap.get('sort');
    if (isNullOrUndefined(this.activeSort) || Object.values(this.SORTS).indexOf(this.activeSort) === -1) {
      this.activeSort = this.SORTS.BY_NAME;
    }
    this.sortControl = new FormControl(this.activeSort);
    this.sortControl.valueChanges.subscribe( activatedSort => {
      this.router.navigateByUrl('/computer/' +
        (this.isInFilterMode() ? `search/${this.readSearchParameter()}/` : 'order/') +
        `${activatedSort}/page/1/limit/${this.pageInfo.pageSize}`);
      this.loadContent(this.readPageParameter(), limit);
    });
    let limit = +this.route.snapshot.paramMap.get('limit');
    if (this.pageSizeOptions.indexOf(limit) === -1) {
      limit = this.pageSizeOptions[0];
    }
    this.loadContent(this.readPageParameter(), limit);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.appService.changeTitle('HOME.COMPUTER.NAME');
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

  pageEvent(pageInfo: PageEvent) {

    if (pageInfo.pageSize !== this.pageInfo.pageSize) {
      this.transition = 'init';
    } else {
      this.transition =
        this.pageInfo.pageIndex > pageInfo.pageIndex ? 'left' : 'right';
    }
    let url: string;
    if (this.isInFilterMode()) {
      url = `/computer/search/${this.readSearchParameter()}`;
      if (this.activeSort !== this.SORTS.BY_NAME) {
        url += `/${this.activeSort}`;
      }
      if (pageInfo.pageIndex > 0 || pageInfo.pageSize !== this.pageSizeOptions[0]) {
        url += `/page/${pageInfo.pageIndex + 1}/limit/${pageInfo.pageSize}`;
      }
    } else {
      url = `/computer/page/${pageInfo.pageIndex + 1}/limit/${pageInfo.pageSize}`;
    }
    this.router.navigateByUrl(url);
    this.loadContent(pageInfo.pageIndex + 1, pageInfo.pageSize);
    this.pageInfo = pageInfo;
  }

  submitSearch() {
    if (this.searchControl.valid) {
      if ( typeof this.searchControl.value === 'string') {
        this.router.navigateByUrl(
          this.searchControl.value.length > 0 ?
            `/computer/search/${ this.searchControl.value }`
            : `/computer/page/1/limit/${ this.pageInfo.pageSize }`
        );
        this.loadContent(1, this.pageInfo.pageSize, this.searchControl.value);
      } else if ( this.searchControl.value.id ) {
        this.router.navigateByUrl(
          `/computer/${ this.searchControl.value.id }`
        );
      }
    }
  }

  displayFn(computer?: Computer): string | undefined {
    return computer ? computer.name : undefined;
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
      ? this.computerService.search({page, limit}, searchedKeywords, this.activeSort)
      : this.computerService.get({ page, limit }, this.activeSort);
    usedService.subscribe(springDataPage => {
      this.computers = new Page<Computer>(springDataPage);
      this.pageInfo = {
        pageIndex: page - 1,
        pageSize: limit,
        length: this.computers.totalElements
      };
    });
  }

  showDialog() {
    // open modal
    this._addDialog = this._dialog.open(DialogComponent, {
      width: '40vw',
      disableClose: true,
      data: new Computer()
    });

    // subscribe to afterClosed observable to do process
    this._addDialog.afterClosed()
      .subscribe(
        (computer: any) => {
          if (computer) {
            this.computerService.add(computer).subscribe(
              id => this.router.navigate(['/computer/', id])
            );
          }
        });
  }
}
