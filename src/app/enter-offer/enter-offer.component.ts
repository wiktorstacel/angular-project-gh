import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  
  //unamePattern = "^[a-z0-9_-]{8,15}$";
  //pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  //mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
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
      wp0: [null,[
        Validators.required,
        Validators.minLength(5), Validators.maxLength(40),
        Validators.pattern('^(ą| |ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]|[0-9]){5,40}$')
      ]],
      wp1: [null, Validators.required],
      wp2: [null, Validators.required],
      wp3: [null, Validators.required],
      wp4: [
        {value: null, disabled: true},[
        Validators.required,//wp4: new FormControl({value: 'Nancy', disabled: true})
        Validators.minLength(3), Validators.maxLength(20),
        Validators.pattern('^(ą| |-|ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]){3,20}$')
      ]],
      wp5: [null,[
        Validators.required,
        Validators.minLength(5), Validators.maxLength(30),
        Validators.pattern('^(ą| |-|/|\|ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]|[0-9]){5,40}$')
      ]],
      wp6: [null, Validators.required, Validators.maxLength(9)],
      wp7: [null, Validators.required, Validators.maxLength(9)],
      wp8: [null,[
        Validators.maxLength(255),
        Validators.pattern('^(ą| |\\?|\\!|\\.|,|-|/|\|ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]|[0-9]){0,255}$')
      ]]
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
  
  get wp0() {return this.enterOfferForm.get('wp0');}
  get wp1() {return this.enterOfferForm.get('wp1');}
  get wp2() {return this.enterOfferForm.get('wp2');}
  get wp3() {return this.enterOfferForm.get('wp3');}
  get wp4() {return this.enterOfferForm.get('wp4');}
  get wp5() {return this.enterOfferForm.get('wp5');}
  get wp6() {return this.enterOfferForm.get('wp6');}
  get wp7() {return this.enterOfferForm.get('wp7');}
  get wp8() {return this.enterOfferForm.get('wp8');}

}
