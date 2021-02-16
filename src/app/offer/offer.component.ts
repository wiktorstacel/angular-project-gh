import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  
  response = "";

  constructor(private _http: HttpService) { }

  ngOnInit(): void {
  }
  
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

}
