import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discontinuedDatePipe'
})
export class DiscontinuedDatePipe implements PipeTransform {

  transform(discontinued: Date, args?: any): string {
    if (discontinued == null) {
      return 'This computer is still in production or no discontinuation date were provided.';
    }

    let result = 'Discontinued in : ';
    result += discontinued.toLocaleDateString();

    return result;
  }

}
