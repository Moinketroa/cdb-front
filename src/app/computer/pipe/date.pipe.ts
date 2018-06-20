import {PipeTransform} from '@angular/core';

export class DatePipe implements PipeTransform {

  transform(introduced: number[], args?: any): any {
    return'';
  }

  protected addZeroIfLessThanTen(value: number): string {
    if (value < 10) {
      return '0' + value;
    }
  }
}
