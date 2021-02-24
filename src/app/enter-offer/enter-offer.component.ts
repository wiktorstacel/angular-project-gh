import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SelectService } from '../home/select.service';
import { HttpService } from '../http.service';
//import { ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-enter-offer',
  templateUrl: './enter-offer.component.html',
  styleUrls: ['./enter-offer.component.scss']
})
export class EnterOfferComponent implements OnInit {
  
  enterOfferForm: FormGroup;
  checkboxNewTownStatus = false;
  response = "";
  
  public errorMsg: any;
  public offerTypes: Array<{rodzaj_id: number, nazwa: string}> = [];
  public voivodeShips: Array<{wojewodztwo_id: number, nazwa: string}> = [];
  public towns: Array<{miejscowosc_id: number, nazwa: string, wojewodztwo_id: number}> = [];
  public townsAllMemory: Array<{miejscowosc_id: number, nazwa: string, wojewodztwo_id: number}> = [];
  public activeOffers: Array<{oferta_id: number, opis: string}> = [];

  constructor(
                private fb: FormBuilder, 
                private _selectService: SelectService,
                private _http: HttpService
              ) {
    this.enterOfferForm = fb.group({});
  }

  ngOnInit(): void {
    
    this.enterOfferForm = this.fb.group({
      id: [],
      wp0: [null],
      wp1: [null],
      wp2: [null],
      wp3: [null],
      wp4: [{value: null, disabled: true}],//wp4: new FormControl({value: 'Nancy', disabled: true})
      wp5: [null],
      wp6: [null],
      wp7: [null],
      wp8: [null]
    });
    
    this._selectService.getOfferTypes().subscribe(
        data => this.offerTypes = data,
        error => this.errorMsg = error
    );
      
    this._selectService.getVoivodeships().subscribe(
        data => this.voivodeShips = data,
        error => this.errorMsg = error
    ); 
    
    this._selectService.getTowns().subscribe(
        data => {this.towns = data, this.townsAllMemory = data},
        error => this.errorMsg = error
    );
    
    this._selectService.getActiveOffers().subscribe(
        data => this.activeOffers = data,
        error => this.errorMsg = error
    );
    
  }
  
  switchTownInput() {
    if(this.enterOfferForm.controls['wp3'].disabled)
    {
      this.enterOfferForm.controls['wp3'].enable();
      this.enterOfferForm.controls['wp4'].disable();
    }
    else
    {
      this.enterOfferForm.controls['wp3'].disable();
      this.enterOfferForm.controls['wp4'].enable();
      //FormGroup.focus(this.fg.controls.wp4);
      //this.enterOfferForm.controls['wp4'].focus();      
    }
  }
  
  onSubmitCallOffer() {
    
  }
  
  onSubmitSaveOffer() {
    console.log(this.enterOfferForm.value);
    this._http.onSubmitSaveOffers(this.enterOfferForm.value).subscribe(
      res => {
        console.log(res);
        this.response = res;
      },
      err => {
        console.log(err);
      }
    )
  }
  
  onVoivodeship(wojewodztwo_id: number) {
    if(wojewodztwo_id === 0)
    {
      this.towns = this.townsAllMemory;
      this.enterOfferForm.controls['wp3'].reset();
    }
    else
    {
      this.towns = [];
      for(let i=0; i<this.townsAllMemory.length; i++)
      {
        if(this.townsAllMemory[i].wojewodztwo_id === wojewodztwo_id)
        {
          this.towns.push(this.townsAllMemory[i]);
        }
      }
    }
  }

}
