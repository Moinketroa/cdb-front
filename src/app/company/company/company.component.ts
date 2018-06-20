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

  step = 16;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.style = {
      width: this.calculateWidth() + 'px'
    };
  }

  calculateWidth() {
    /* font-size is 14, font is monospace
    * space between characters is Math.floor(14 * 0.6) = 8
    * the average length of company names in database is around 15,
    * we pick 16 (this.step) as it is a multiple of 8.
    * note that there is also a 16px horizontal padding :
    * 16 * 2 (left and right side) is sqrt(16) * 8px;
    */
    return 8 * this.step * (
      Math.floor(this.company.name.length / this.step) +
      (this.company.name.length % this.step === 0 ? 0 : 1)
    );
  }

}
