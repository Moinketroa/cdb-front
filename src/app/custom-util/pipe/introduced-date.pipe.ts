import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'introducedDatePipe'
})
export class IntroducedDatePipe implements PipeTransform {

  transform(introduced: Date, more: boolean = true): any {
    if (introduced == null) {
      return 'No introduction date';
    }

    console.log(introduced);

    let result = '';

    if (more) {
      result += 'First introduced in : ';
    }

    result += introduced.toLocaleDateString();

    return result;
  }

}
