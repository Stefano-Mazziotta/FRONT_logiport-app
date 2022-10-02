import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateGeneratorDTO, IGetAllGeneratorsDTO, IResponseListGenerator, IResponseOneGenerator, IResponseNullData, IUpdateGeneratorDTO, ISearchGeneratorDTO } from 'src/app/interfaces/generator';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private http: HttpClient) { }

  private myAppUrl = 'http://localhost:8080/';
  private myApiUrl = 'api/generators/';

  public getAllGenerators(params:IGetAllGeneratorsDTO):Observable<IResponseListGenerator>{

    const { idCompany, idBoat } = params;
    const queryString = `?idCompany=${idCompany}&idBoat=${idBoat}`;

    return this.http.get<IResponseListGenerator>(this.myAppUrl + this.myApiUrl + queryString);
  }

  public getGeneratorById(idGenerator:string):Observable<IResponseOneGenerator>{
    return this.http.get<IResponseOneGenerator>(this.myAppUrl + this.myApiUrl + idGenerator );
  }

  public createGenerator(generator:ICreateGeneratorDTO):Observable<IResponseNullData>{
    return this.http.post<IResponseNullData>(this.myAppUrl + this.myApiUrl, generator);
  }

  public updateGenerator(generator:IUpdateGeneratorDTO):Observable<IResponseNullData>{
    const { idGenerator } = generator;
    return this.http.put<IResponseNullData>(this.myAppUrl + this.myApiUrl + idGenerator, generator);
  }

  public searchGenerator(filterParams:ISearchGeneratorDTO):Observable<IResponseListGenerator>{
    const { idCompany, idBoat, numberGenerator } = filterParams;
    const queryString = `?idCompany=${idCompany}&idBoat=${idBoat}&numberGenerator=${numberGenerator}`;

    return this.http.get<IResponseListGenerator>(this.myAppUrl + this.myApiUrl + queryString);
  }

  public deleteGenerator(idGenerator:string):Observable<IResponseNullData>{
    return this.http.delete<IResponseNullData>(this.myAppUrl + this.myApiUrl + idGenerator);
  }
}
