import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Boat } from '../../interfaces/boat';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/boats/';

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getListBoats(idCompanySelected:number):Observable<Boat[]>{
    return this.http.get<Boat[]>(this.myAppUrl + this.myApiUrl ,{
      params: {
        IdCompany: idCompanySelected
      }
    });
    
  }

  getBoatById(idBoat:number):Observable<Boat>{
    return this.http.get<Boat>(this.myAppUrl + this.myApiUrl + idBoat);
  }
  
  insertBoat(boat:Boat):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, boat)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteBoat(IdBoat?:number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + IdBoat)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  updateBoat(boat:Boat):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + boat.IdBoat, boat)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  searchBoat(boatName:string, idCompanySelected:number):Observable<Boat[]>{
    return this.http.get<Boat[]>(this.myAppUrl + this.myApiUrl ,{
      params: {
        IdCompany: idCompanySelected,
        BoatName: boatName
      }
    });

  }

}
