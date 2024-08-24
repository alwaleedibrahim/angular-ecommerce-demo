import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditcard',
  standalone: true
})
export class CreditcardPipe implements PipeTransform {

  transform(value: string): any {
      const arr = value.match(/[0-9]{4}/g)
      if (arr?.length == 4) {
        return arr?.join(" - ");
      }
      return "";
  }
}
