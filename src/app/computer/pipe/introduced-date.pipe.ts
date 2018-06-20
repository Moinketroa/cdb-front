import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'introducedDatePipe'
})
export class IntroducedDatePipe implements PipeTransform {

  transform(introduced: Date, args?: any): any {
    if (introduced == null) {
      return 'This computer is not yet released or no introduction date were provided.';
    }

    let result = 'First introduced in : ';
    result += introduced.toLocaleDateString();

    return result;
  }

}
