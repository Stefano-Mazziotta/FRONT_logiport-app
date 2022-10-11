export default class UtilsDate {

    public static dateToTimestamp(date:Date):number {
        return date.getTime();   
    }

    public static timestampToDate(timestamp:number):string {
        let date = new Date (timestamp).toLocaleDateString();
    
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