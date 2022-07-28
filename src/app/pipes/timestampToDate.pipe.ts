import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: number | null):string {

    if(timestamp == null){
      return "";
    }

    let timestampMilliseconds: number = (timestamp * 1000);
    let date = new Date(timestampMilliseconds).toLocaleDateString();

    return date;
  }
}