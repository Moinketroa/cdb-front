import {Component, Input, OnInit} from '@angular/core';
import {Company} from '../company.model';

@Component({
  selector: 'cdb-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
