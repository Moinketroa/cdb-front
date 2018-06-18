import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company.model';

@Component({
  selector: 'cdb-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  company: Company;
  nbrIngredients: number;

  constructor(private companyService: CompanyService) {
    this.nbrIngredients = 1;
    this.company = new Company();
  }

  ngOnInit() {
  }

  ajouter() {
    this.companyService.add(this.company).subscribe();
  }

}
