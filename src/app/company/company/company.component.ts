import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'cdb-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() company: Company;
  style: any;

  step = 15;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.style = {
      width: this.calculateWidth() + 'px'
    };
  }

  calculateWidth() {
    /* font-size is 14, font is monospace
    * space between characters is 14 * 0.6, we use Math.ceil(14 * 0.6) = 9
    * the average length of company names in database is around 15 (and pgcd(15,9) = sqrt(9)),
    * note that there is also a 18px horizontal padding.
    */
    return 9 * this.step * (
      Math.floor(this.company.name.length / this.step) +
      (this.company.name.length % this.step === 0 ? 0 : 1)
    );
  }

}
