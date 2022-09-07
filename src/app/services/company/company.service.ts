import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany, ICreateCompanyDTO, IUpdateCompanyDTO, ISearchCompanyDTO, IResponseListCompany, IResponseOneCompany, IResponseNullData } from 'src/app/interfaces/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/companies/';

  constructor(private http: HttpClient) { }

  getListCompanies(): Observable<IResponseListCompany> {
    return this.http.get<IResponseListCompany>(this.myAppUrl + this.myApiUrl);
  }

  getCompanyById(idCompany: string): Observable<IResponseOneCompany> {
    return this.http.get<IResponseOneCompany>(this.myAppUrl + this.myApiUrl + idCompany);
  }

  insertCompany(company: ICreateCompanyDTO): Observable<IResponseNullData> {
    return this.http.post<IResponseNullData>(this.myAppUrl + this.myApiUrl, company);
  }

  deleteCompany(idCompany: string): Observable<IResponseNullData> {
    return this.http.delete<IResponseNullData>(this.myAppUrl + this.myApiUrl + idCompany);
  }

  updateCompany(company: IUpdateCompanyDTO): Observable<IResponseNullData> {
    return this.http.put<IResponseNullData>(this.myAppUrl + this.myApiUrl + company.idCompany, company);
  }

  searchCompany(searchCompanyDTO: ISearchCompanyDTO): Observable<IResponseListCompany> {
    return this.http.get<IResponseListCompany>(this.myAppUrl + this.myApiUrl, {
      params: {
        ... searchCompanyDTO
      }
    });

  }
}
