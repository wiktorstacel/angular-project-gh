import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    
  brews: any;

  constructor(private _http: HttpService) { 
    this.brews = [];
    //The "= {};" initializes a new object. The "= [];" initializes a new iterable list
  }

  ngOnInit(): void {
      this._http.getBeer().subscribe(data => {
          this.brews = data
          console.log(this.brews);
          });
  }

}
