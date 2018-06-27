import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'introducedDatePipe'
})
export class IntroducedDatePipe implements PipeTransform {

  transform(introduced: Date, more: boolean = true): any {
    if (introduced == null) {
      return 'COMPUTER.NODATEINTRO';
    }

    return introduced.toLocaleDateString();
  }

}
