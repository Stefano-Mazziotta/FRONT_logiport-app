import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateBoatDTO, IUpdateBoatDTO, ISearchBoatDTO, IResponseListBoat, IResponseOneBoat, IResponseNullData } from 'src/app/interfaces/boat';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/boats/';

  constructor(private http: HttpClient) { }

  public getAllBoats(idCompany:string):Observable<IResponseListBoat>{
    return this.http.get<IResponseListBoat>(this.myAppUrl + this.myApiUrl + `?idCompany=${idCompany}`);
  }

  public getBoatById(idBoat:string):Observable<IResponseOneBoat>{
    return this.http.get<IResponseOneBoat>(this.myAppUrl + this.myApiUrl + idBoat );
  }
  
  public createBoat(boat:ICreateBoatDTO):Observable<IResponseNullData>{
    return this.http.post<IResponseNullData>(this.myAppUrl + this.myApiUrl, boat);
  }

  public updateBoat(boat:IUpdateBoatDTO):Observable<IResponseNullData>{
    return this.http.put<IResponseNullData>(this.myAppUrl + this.myApiUrl + boat.idBoat, boat);
  }

  public deleteBoat(idBoat:string):Observable<IResponseNullData>{
    return this.http.delete<IResponseNullData>(this.myAppUrl + this.myApiUrl + idBoat);
  }

  public searchBoat(filterParams:ISearchBoatDTO):Observable<IResponseListBoat>{
    const { idCompany, boatName } = filterParams;
    const queryString = + `?idCompany=${idCompany}&boatName=${boatName}`;

    return this.http.get<IResponseListBoat>(this.myAppUrl + this.myApiUrl + queryString);
  }

}
