import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Computer} from '../computer.model';
import {Page} from '../../page.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../company/company.service';
import {AppService} from '../../app.service';
import {ComputerService} from '../computer.service';
import {Company} from '../../company/company.model';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'cdb-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
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

  constructor( private computerService: ComputerService,
               private router: Router,
               private route: ActivatedRoute,
               private appService: AppService) { }

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

}
