import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { 
  ICreateExpirationDTO, IUpdateExpirationDTO, IGetAllExpirationsDTO, 
  ISearchExpirationDTO, IResponseListExpiration, IResponseOneExpiration,
  IResponseNullData  
} from 'src/app/interfaces/expiration';

@Injectable({
  providedIn: 'root'
})
export class ExpirationService {

  constructor(private http: HttpClient) { }

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/expirations/';

  public getAllExpirations(params:IGetAllExpirationsDTO):Observable<IResponseListExpiration>{

    const { idCompany, idBoat } = params;
    const queryString = `?idCompany=${idCompany}&idBoat=${idBoat}`;

    return this.http.get<IResponseListExpiration>(this.myAppUrl + this.myApiUrl + queryString);
  }

  public getExpirationById(idExpiration:string):Observable<IResponseOneExpiration>{
    return this.http.get<IResponseOneExpiration>(this.myAppUrl + this.myApiUrl + idExpiration );
  }

  public createExpiration(expiration:ICreateExpirationDTO):Observable<IResponseNullData>{
    return this.http.post<IResponseNullData>(this.myAppUrl + this.myApiUrl, expiration);
  }

  public updateExpiration(expiration:IUpdateExpirationDTO):Observable<IResponseNullData>{
    const { idExpiration } = expiration;
    return this.http.put<IResponseNullData>(this.myAppUrl + this.myApiUrl + idExpiration, expiration);
  }

  public deleteExpiration(idExpiration:string):Observable<IResponseNullData>{
    return this.http.delete<IResponseNullData>(this.myAppUrl + this.myApiUrl + idExpiration);
  }

  public searchExpiration(filterParams:ISearchExpirationDTO):Observable<IResponseListExpiration>{
    const { idCompany, idBoat, title } = filterParams;
    const queryString = `?idCompany=${idCompany}&idBoat=${idBoat}&title=${title}`;

    return this.http.get<IResponseListExpiration>(this.myAppUrl + this.myApiUrl + queryString);
  }


}
