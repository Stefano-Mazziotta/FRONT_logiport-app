import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, tap} from 'rxjs/operators'
import { Company } from 'src/app/interfaces/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // http://logiport.app.local/Back_logiport-app/index.php/company/list ---> list companies
  // http://logiport.app.local/Back_logiport-app/index.php/company/insert ---> insert company

  private myAppUrl = 'http://logiport.app.local/Back_logiport-app/';
  private myApiUrl = 'index.php/company/'; // /list?limit=10

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getListCompanies():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'list');
  }

  insertCompany(company:Company):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + 'insert', company)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteCompany(companyID?:number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + 'delete/' + companyID)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
