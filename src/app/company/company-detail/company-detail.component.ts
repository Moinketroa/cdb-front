import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cdb-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  @Input() company: Company;
  displayedColumns = ['name', 'introduced', 'discontinued'];

  breakpoint: number;

  constructor(private companyService: CompanyService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.companyService.getById(this.route.snapshot.paramMap.get('id')).subscribe(comp => this.company = new Company(comp));
    console.log((window.innerWidth));
    this.breakpoint = (window.innerWidth <= 2000) ? 1 : 2;
  }

  onResize(event) {
    console.log(event.target.innerWidth);
    this.breakpoint = (event.target.innerWidth <= 2000) ? 1 : 2;
  }
}
