export default class UtilsDate {

    public static dateToTimestamp(date:Date):number {
        return date.getTime() / 1000;   
    }

    public static timestampToDate(timestamp:number):string {
        let timestampMilliseconds:number = ( timestamp * 1000 );
        let date = new Date (timestampMilliseconds).toLocaleDateString();
    
        return date;   
    }

    public static formatDateToYYYYMMDD(date:string):string {
        let partsOfDate: string[] = date.split('/');
        if(partsOfDate.length === 3){ 
            return `${partsOfDate[2]}-${partsOfDate[1]}-${partsOfDate[0]}`;
        }    
        return date;   
    }

    
}