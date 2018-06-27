import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discontinuedDatePipe'
})
export class DiscontinuedDatePipe implements PipeTransform {

  transform(discontinued: Date, more: boolean = true): string {
    if (discontinued == null) {
      return 'COMPUTER.NODATEDISC';
    }

    return discontinued.toLocaleDateString();
  }

}
