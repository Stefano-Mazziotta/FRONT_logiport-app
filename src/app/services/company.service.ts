import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators'
import { Company } from 'src/app/interfaces/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private myAppUrl = 'http://logiport.app.local/Back_logiport-app/';
  private myApiUrl = 'index.php/company/'; // /list?limit=10

  constructor(private http: HttpClient) { }

  getListCompanies():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'list');
  }
}
