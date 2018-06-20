import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from './date.pipe';

@Pipe({
  name: 'introducedDatePipe'
})
export class IntroducedDatePipe extends DatePipe {

  transform(introduced: number[], args?: any): any {
    if (introduced == null) {
      return 'This computer is not yet released or no introduction date were provided.';
    }

    let result = 'First introduced in : ';
    result += this.addZeroIfLessThanTen(introduced[2]) + '/';
    result += this.addZeroIfLessThanTen(introduced[1]) + '/';
    result += introduced[0];

    return result;
  }

}
