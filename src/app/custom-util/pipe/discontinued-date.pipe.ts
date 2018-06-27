import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discontinuedDatePipe'
})
export class DiscontinuedDatePipe implements PipeTransform {

  transform(discontinued: Date, more: boolean = true): string {
    if (discontinued == null) {
      return 'No discontinuation date';
    }

    console.log(discontinued);

    let result = '';

    if (more) {
      result += 'Discontinued in : ';
    }

    result += discontinued.toLocaleDateString();

    return result;
  }

}
