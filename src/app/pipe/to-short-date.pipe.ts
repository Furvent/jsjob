import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate'
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.toLowerCase() === 'asap') {
      return 'Dès que possible';
    } else if (value.indexOf('-') > -1){
      let fullDate, rest;
      [fullDate, rest] = value.toLowerCase().split('t'); // Partage en deux la date, à droite du 'T' se trouve l'heure, qui ne nous intéresse pas.

      let year, month, date;
      [year, month, date] = fullDate.split('-');

      return `${date}/${month}/${year}`;
    } else {
      return '--';
    }
  }

}
