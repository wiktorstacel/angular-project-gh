import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IOfferType } from './offer-type';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  
  private _url: string = '/api/api/offer_types.php';

  constructor(private http: HttpClient) { }
  
  getOfferTypes(): Observable<IOfferType[]>{
    return this.http.get<IOfferType[]>(this._url)
      .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
