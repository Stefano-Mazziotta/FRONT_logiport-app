import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysToExpirationMsg'
})
export class DaysToExpirationMsgPipe implements PipeTransform {

  transform(days:number): string {
    
    let msg = `Vence en ${days} días`;

    if(days === 1){
      msg = `Vence en ${days} día`;
    }
    if(days === 0){
      msg = `Vence hoy`;
    }
    if(days === -1){
      msg = `Vencido`;
    }
    
    return msg;
  }

}
