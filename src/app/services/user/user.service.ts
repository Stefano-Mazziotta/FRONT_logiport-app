import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = 'http://localhost:8080/';
  private apiUrl = 'api/users/';

  constructor(private http: HttpClient) { 

    if(window.location.host == 'app.logiport.com.ar'){
      this.serverUrl = 'https://app.logiport.com.ar/'
    }

  }

  public login(userData:any):Observable<any>{
    return this.http.post(this.serverUrl + this.apiUrl + 'login' , userData);
  }

  private existTokenObservable:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get existToken() {
    return this.existTokenObservable.asObservable();
  }

  set existTokenNewData(existToken:boolean){
    this.existTokenObservable.next(existToken);
  }



}
