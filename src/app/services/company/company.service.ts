import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateCompanyDTO, IUpdateCompanyDTO, ISearchCompanyDTO, IResponseListCompany, IResponseOneCompany, IResponseNullData } from 'src/app/interfaces/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/companies/';

  constructor(private http: HttpClient) {
    if(window.location.host == 'app.logiport.com.ar'){
      this.myAppUrl = 'https://app.logiport.com.ar/'
    }
  }

  public getAllCompanies(): Observable<IResponseListCompany> {
    return this.http.get<IResponseListCompany>(this.myAppUrl + this.myApiUrl);
  }

  public getCompanyById(idCompany: string): Observable<IResponseOneCompany> {
    return this.http.get<IResponseOneCompany>(this.myAppUrl + this.myApiUrl + idCompany);
  }

  public createCompany(company: ICreateCompanyDTO): Observable<IResponseNullData> {
    return this.http.post<IResponseNullData>(this.myAppUrl + this.myApiUrl, company);
  }

  public deleteCompany(idCompany: string): Observable<IResponseNullData> {
    return this.http.delete<IResponseNullData>(this.myAppUrl + this.myApiUrl + idCompany);
  }

  public updateCompany(company: IUpdateCompanyDTO): Observable<IResponseNullData> {
    return this.http.put<IResponseNullData>(this.myAppUrl + this.myApiUrl + company.idCompany, company);
  }

  public searchCompany(searchCompanyDTO: ISearchCompanyDTO): Observable<IResponseListCompany> {
    const { razonSocial } = searchCompanyDTO;
    return this.http.get<IResponseListCompany>(this.myAppUrl + this.myApiUrl + `?razonSocial=${razonSocial}`);
  }

}
