import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectService } from '../home/select.service';

@Component({
  selector: 'app-enter-offer',
  templateUrl: './enter-offer.component.html',
  styleUrls: ['./enter-offer.component.scss']
})
export class EnterOfferComponent implements OnInit {
  
  enterOfferForm: FormGroup;
  
  public errorMsg: any;
  public offerTypes: Array<{rodzaj_id: number, nazwa: string}> = [];
  public voivodeShips: Array<{wojewodztwo_id: number, nazwa: string}> = [];
  public towns: Array<{miejscowosc_id: number, nazwa: string, wojewodztwo_id: number}> = [];
  public townsAllMemory: Array<{miejscowosc_id: number, nazwa: string, wojewodztwo_id: number}> = [];
  public activeOffers: Array<{oferta_id: number, opis: string}> = [];

  constructor(private fb: FormBuilder, private _selectService: SelectService) {
    this.enterOfferForm = fb.group({});
  }

  ngOnInit(): void {
    
    this.enterOfferForm = this.fb.group({
    wp1: [null],
    wp2: [null],
    wp3: [null]
    //p4: [],
    //p5: [],
    //p6: [true],
    //p7: [false]
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
  
  onSubmitCallOffer() {
    
  }
  
  onSubmitSaveOffer() {
    
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
