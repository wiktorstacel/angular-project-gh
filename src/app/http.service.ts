import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IOfferFormat } from './enter-offer/offer-format';
import { IOfferShow } from './home/offer-show';
import { ITransactionShow } from './transaction/transaction-show';
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
  
  onSubmitShowOffers(fromData: FormData):Observable<IOfferShow[]>{
    return this.http.post<IOfferShow[]>('/api/api/show_offers.php', fromData)
  }
  
  onSubmitSaveOffers(fromData: FormData):Observable<any>{
    return this.http.post<any>('/api/api/save_offer.php', fromData)
  }
  
  onCallOfferToEdit(fromData: FormData):Observable<IOfferFormat[]>{
    return this.http.post<IOfferFormat[]>('/api/api/insert_offer.php', fromData)
  }
  
  getTransactions(): Observable<ITransactionShow[]>{
    return this.http.get<ITransactionShow[]>('/api/api/show_transactions.php')
      .pipe(catchError(this.errorHandler));
  }
  
  getTransactionTop(): Observable<ITransactionShow[]>{
    return this.http.get<ITransactionShow[]>('/api/api/show_transaction_top.php')
      .pipe(catchError(this.errorHandler));
  }
  
  onSubmitTransaction(fromData: FormData):Observable<any>{
    return this.http.post<any>('/api/api/make_transaction.php', fromData)
  }
  
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
  
}
