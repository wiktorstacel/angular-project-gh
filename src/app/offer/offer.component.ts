import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements AfterViewInit {
  
  response = "";
  testName: string = "";
  userName: string = "";
  private _customerName: string = "";
  @ViewChild('nameRef') nameElementRef!: ElementRef;
  
  get customerName(): string {
    return this._customerName;
  }
  
  set customerName(value: string) {
    this._customerName = value;
    if(value === 'Vishwas') alert('Hello Vishwas');
  }

  constructor(private _http: HttpService) { }

  ngAfterViewInit(): void {
    this.nameElementRef.nativeElement.focus();
    console.log(this.nameElementRef);
  }
  
  //Angular 9+ you can add headers and params directly without the key-value notion:
  //const headers = new HttpHeaders().append('header', 'value');
  //const params = new HttpParams().append('param', 'value');
  //this.http.get('url', {headers, params});
  onSend(id: string) { //How to change to number?
    const formData : FormData = new FormData();
    formData.append('id', id);
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //console.log(formData);//, headers - as 2nd parameter in onSendService(formData, headers) to send POST
    this._http.onSendService(formData).subscribe(
      res => {
        console.log(res);
        this.response = res;
      },
      err => {
        console.log(err);
      }
    )
  }
  
  greetVishwas(updatedValue: string) {
    this.userName = updatedValue;
    if(updatedValue === 'Vishwas') alert('Welcome back Vishwas');
  }

}
