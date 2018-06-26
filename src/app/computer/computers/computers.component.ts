import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Computer} from '../computer.model';
import {Page} from '../../page.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../company/company.service';
import {AppService} from '../../app.service';
import {ComputerService} from '../computer.service';
import {Company} from '../../company/company.model';
import {MatDialog, MatDialogRef, PageEvent} from '@angular/material';
import {DialogComponent} from '../../dialog/dialog.component';

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
export class ComputersComponent implements OnInit {

  computers: Page<Computer>;
  pageInfo: PageEvent;
  transition = 'init';

  private _addDialog: MatDialogRef<DialogComponent>;

  constructor( private computerService: ComputerService,
               private router: Router,
               private _dialog: MatDialog,
               private route: ActivatedRoute,
               private appService: AppService) {
  }

  ngOnInit() {
    this.loadContent(1, 20);
  }

  loadContent(page, limit) {
    this.computerService.get({ page, limit }).subscribe(springDataPage => {
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
