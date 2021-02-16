import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
