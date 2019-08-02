import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    
    let formatData = value.split('T');
    let formatData2 = formatData[0].split('-');
    let ano = formatData2[0];
    let mes = formatData2[1];
    let dia = formatData2[2];

    return dia + "/"+mes + "/" +ano;
  }
}
