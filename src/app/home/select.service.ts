import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IOfferType } from './offer-type';
import { IVoivodeship } from './voivodeship';
import { ITown } from './town';
import { IActiveOffer } from '../enter-offer/active-offer';
import { IAgentShow } from '../transaction/agent-show';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  
  private _url1: string = '/api/api/offer_types.php';
  private _url2: string = '/api/api/voivodeships.php';
  private _url3: string = '/api/api/towns.php';
  private _url4: string = '/api/api/active_offers.php';
  private _url5: string = '/api/api/show_agents.php';

  constructor(private http: HttpClient) { }
  
  getOfferTypes(): Observable<IOfferType[]>{
    return this.http.get<IOfferType[]>(this._url1)
      .pipe(catchError(this.errorHandler));
  }
  
  getVoivodeships(): Observable<IVoivodeship[]>{
    return this.http.get<IVoivodeship[]>(this._url2)
      .pipe(catchError(this.errorHandler));
  }
  
  getTowns(): Observable<ITown[]>{
    return this.http.get<ITown[]>(this._url3)
      .pipe(catchError(this.errorHandler));
  }
  
  getActiveOffers(): Observable<IActiveOffer[]>{
    return this.http.get<IActiveOffer[]>(this._url4)
      .pipe(catchError(this.errorHandler));
  }
  
  onCallAgents(fromData: FormData):Observable<IAgentShow[]>{
    return this.http.post<IAgentShow[]>(this._url5, fromData)
  }  
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
