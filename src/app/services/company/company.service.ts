import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, tap} from 'rxjs/operators'
import { Company } from 'src/app/interfaces/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/companies/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getListCompanies():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  insertCompany(company:Company):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, company)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteCompany(companyID?:number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + companyID)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  updateCompany(company:Company):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + company.IdCompany, company)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  searchCompany(companyRazonSocial:string):Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl ,{
      params: {
        RazonSocial: companyRazonSocial
      }
    });

  }
}
