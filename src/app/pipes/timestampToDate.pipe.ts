import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: number | null):string {

    if(timestamp == null){
      return "";
    }

    let date = new Date(timestamp).toLocaleDateString();

    return date;
  }
}