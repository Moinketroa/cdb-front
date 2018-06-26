import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'introducedDatePipe'
})
export class IntroducedDatePipe implements PipeTransform {

  transform(introduced: Date, args?: any): any {
    if (introduced == null) {
      return 'No introduction date';
    }

    let result = 'First introduced in : ';
    result += introduced.toLocaleDateString();

    return result;
  }

}
