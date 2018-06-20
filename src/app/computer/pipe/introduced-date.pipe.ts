import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'introducedDatePipe'
})
export class IntroducedDatePipe implements PipeTransform {

  transform(introduced: any, args?: any): any {
    if (introduced == null) {
      return 'This computer is not yet released or no introduction date were provided.';
    }

    let result = 'First introduced in : ';
    result += introduced.dayOfMonth + '/';
    result += introduced.monthValue + '/';
    result += introduced.year;

    return result;
  }

}
