import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMoneySymbol'
})
export class ToMoneySymbolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log("symbole: " + value.toLowerCase());
    switch (value.toLowerCase()) {
      case 'eur':
        return '€';
      case 'pounds': 
        return '£';
      case 'cfa':
        return 'CFA';
      case 'cad':
        return '$';
      default:
        return value;
    }
  }

}
