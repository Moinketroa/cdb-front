import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discontinuedDatePipe'
})
export class DiscontinuedDatePipe implements PipeTransform {

  transform(discontinued: Date, args?: any): string {
    if (discontinued == null) {
      return 'COMPUTER.NODATEDISC';
    }
    return discontinued.toLocaleDateString();
  }

}
