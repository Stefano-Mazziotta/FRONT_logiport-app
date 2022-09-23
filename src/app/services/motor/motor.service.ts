import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateMotorDTO, IUpdateMotorDTO, IGetAllMotorsDTO, ISearchMotorDTO, IResponseListMotor, IResponseOneMotor, IResponseNullData } from 'src/app/interfaces/motor';

@Injectable({
  providedIn: 'root'
})
export class MotorService {

  constructor(private http: HttpClient) { }

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/motors/';

  public getAllMotors(params:IGetAllMotorsDTO):Observable<IResponseListMotor>{

    const { idCompany, idBoat } = params;
    const queryString = `?idCompany=${idCompany}&idBoat=${idBoat}`;

    return this.http.get<IResponseListMotor>(this.myAppUrl + this.myApiUrl + queryString);
  }

  public getMotorById(idMotor:string):Observable<IResponseOneMotor>{
    return this.http.get<IResponseOneMotor>(this.myAppUrl + this.myApiUrl + idMotor );
  }

  public createMotor(motor:ICreateMotorDTO):Observable<IResponseNullData>{
    return this.http.post<IResponseNullData>(this.myAppUrl + this.myApiUrl, motor);
  }

  public updateMotor(motor:IUpdateMotorDTO):Observable<IResponseNullData>{
    const { idMotor } = motor;
    return this.http.put<IResponseNullData>(this.myAppUrl + this.myApiUrl + idMotor, motor);
  }

  public deleteMotor(idMotor:string):Observable<IResponseNullData>{
    return this.http.delete<IResponseNullData>(this.myAppUrl + this.myApiUrl + idMotor);
  }

  public searchMotor(filterParams:ISearchMotorDTO):Observable<IResponseListMotor>{
    const { idCompany, idBoat, numberMotor } = filterParams;
    const queryString = `?idCompany=${idCompany}&idBoat=${idBoat}&numberMotor=${numberMotor }`;

    return this.http.get<IResponseListMotor>(this.myAppUrl + this.myApiUrl + queryString);
  }


}
