import { Pipe, PipeTransform } from '@angular/core';
import {Company} from '../../company/company.model';

@Pipe({
  name: 'companyPipe'
})
export class CompanyPipe implements PipeTransform {

  transform(company: Company, args?: any): String {
    if (company == null || company.name == null || company.name === '') {
      return 'No company provided';
    } else {
      return company.name;
    }
  }

}
