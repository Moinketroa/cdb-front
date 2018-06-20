import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from './date.pipe';

@Pipe({
  name: 'discontinuedDatePipe'
})
export class DiscontinuedDatePipe extends DatePipe {

  transform(discontinued: number[], args?: any): string {
    if (discontinued == null) {
      return 'This computer is still in production or no discontinuation date were provided.';
    }

    let result = 'Discontinued in : ';
    result += this.addZeroIfLessThanTen(discontinued[2]) + '/';
    result += this.addZeroIfLessThanTen(discontinued[1]) + '/';
    result += discontinued[0];

    return result;
  }

}
