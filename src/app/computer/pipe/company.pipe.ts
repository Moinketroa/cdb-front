import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyPipe'
})
export class CompanyPipe implements PipeTransform {

  transform(value: String, args?: any): String {
    if (value === null || value === '') {
      return 'No company provided';
    } else {
      return value;
    }
  }

}
