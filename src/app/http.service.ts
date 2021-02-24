import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { User } from './code1/user'; - for purpose of usage ngModel - TDF

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  /*myMethod() {
      return console.log('Hejja!');
  }*/
  getBeer() {
      return this.http.get('https://api.openbrewerydb.org/breweries');
  }
  //, headers: any --as 2nd parameter: onSendService(fromData: FormData, headers: any)
  // {headers: headers} as 3rd parameter: ('/api/insert_oferta.php', fromData, {headers: headers})
  onSendService(fromData: FormData):Observable<any>{
    return this.http.post<any>('/api/insert_oferta.php', fromData)
  }
  
  onSendShowOffers(fromData: FormData):Observable<any>{
    return this.http.post<any>('/api/api/show_offers.php', fromData)
  }
  
  onSubmitShowOffers(fromData: FormData):Observable<any>{
    return this.http.post<any>('/api/api/show_offers.php', fromData)
  }
  
  onSubmitSaveOffers(fromData: FormData):Observable<any>{
    return this.http.post<any>('/api/api/show_offers.php', fromData)
  }
}
