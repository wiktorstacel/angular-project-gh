import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { SelectService } from './select.service';
import { HttpService } from '../http.service';
//import { User } from './user'; - for purpose of usage ngModel - TDF
import { FormBuilder, FormGroup } from '@angular/forms'
//import { Observable } from 'rxjs';
import { IOfferShow } from './offer-show';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

//const ELEMENT_DATA: IOfferShow[] = [];
export interface BackEndMsg {
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  response = "";
  searchOfferForm: FormGroup;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  //name: string = 'hey';//clickCounter: number = 0;
  public employees: Array<{id: number, name: string, age: number}> = []; //Array<{id: number, name: string, age: number}> //Array<Object>
  public errorMsg: any;
  public offerTypes: Array<{rodzaj_id: number, nazwa: string}> = [];
  public voivodeShips: Array<{wojewodztwo_id: number, nazwa: string}> = [];
  public towns: Array<{miejscowosc_id: number, nazwa: string, wojewodztwo_id: number}> = [];
  public townsAllMemory: Array<{miejscowosc_id: number, nazwa: string, wojewodztwo_id: number}> = [];
  //public offersShow: MatTableDataSource<IOfferShow>;
  //public offersShow: IOfferShow[] = [];//Array<IOfferShow> - pierwotnie działające deklaracje bez MatTableDataSource
  //offersShow_O = new MatTableDataSource(this.offersShow);
  offersShow = new MatTableDataSource<IOfferShow>();  
  displayedColumns: string[] = ['oferta_id','nazwa','wojewodztwoNazwa','miejscowoscNazwa','ulica','powierzchnia','cena','opis','zakup','edycja','usun'];//

  responseFromDelete: BackEndMsg = <any>[];

  constructor(
                private _employeeService: EmployeeService, 
                private _http: HttpService, 
                private fb: FormBuilder, 
                private _selectService: SelectService,
                public dialog: MatDialog,
                private snackBar: MatSnackBar,
                private route: ActivatedRoute, 
                private router: Router
              ) { 
    this.searchOfferForm = fb.group({});
    this.paginator = <any>[];
  }

  ngOnInit(): void {
    this.searchOfferForm = this.fb.group({
    p1: [null],
    p2: [null],
    p3: [null],
    p4: [],
    p5: [],
    p6: [true],
    p7: [false]
    });
    
    
    //this.employees = this._employeeService.getEmployees(); - it was to get data that were declareted in method in employee.service
    this._employeeService.getEmployees().subscribe(
        data => this.employees = data,
        error => this.errorMsg = error
    );
    
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
      
  }
  
  /*countClick(){
      this.clickCounter += 1;
  }*/
  
  /*setClasses() {
    let myClasses = {
        active: this.clickCounter > 4,
        noactive: this.clickCounter <= 4
        }
    return myClasses;
  }*/
  
  /*onSendShowOffers(p6: any) {
    //console.log(userForm);
    //console.log(p6);
    const formData : FormData = new FormData();
    formData.append('p6', p6);
    //formData.append('p7', p7);
    this._http.onSendShowOffers(formData).subscribe(
      res => {
        console.log(res);
        this.response = res;
      },
      err => {
        console.log(err);
      }
    )
  }*/
  
  onSubmitShowOffers() {
    //console.log(this.registrationForm.value);
    //this._registrationService.register(this.registrationForm.value).subscribe(
    //  response => console.log('Success!', response),
    //  error => console.log('Error', error)
    //);
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //headers - as 2nd parameter in onSendService(formData, headers) to send POST
    console.log(this.searchOfferForm.value);
    //const body = 'data=' + JSON.stringify(this.searchOfferForm.value);
    //console.log(body);
    this._http.onSubmitShowOffers(this.searchOfferForm.value).subscribe(
      res => {
        console.log(res);
        //this.offersShow = new MatTableDataSource(res); //works as well
        this.offersShow.data = res; //.data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!https://stackoverflow.com/questions/57770423/how-to-use-the-mattabledatasource-with-an-observable
        this.offersShow.paginator = this.paginator;
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
      this.searchOfferForm.controls['p3'].reset();
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
    this.onSubmitShowOffers();
  }
  
  buyRow(id: number) {
    
  }
  
  deleteRow(id: string) {
    //console.log(id);
    let dialogRef = this.dialog.open(DialogDeleteComponent, {data: {nr: id}});
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == 'true')
      {
        const formData : FormData = new FormData();
        formData.append('id', id);
        this._http.onSubmitDeleteOffer(formData).subscribe(
            data => this.responseFromDelete = data,
            error => {this.errorMsg = error; console.log(error);},
            () => {
              this.onSubmitShowOffers();
              this.snackBar.open(this.responseFromDelete.message, 'Zamknij', {duration: 5000});
            }
        );
      }
    });
  }
  
  goToEnterForm(id: number) {
    let selectedId = id;
    this.router.navigate(['/enter-offer',{id: selectedId}]);
  }
  
  goToTransaction(id: number) {
    //this.router.navigate(['/transaction', id])
    let selectedId = id;
    this.router.navigate(['/transaction',{id: selectedId}]);
  }
  
  //https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
  applyFilter(event: KeyboardEvent) {
    //console.log(event);
    const target = event.target as HTMLTextAreaElement;
    var activeInput = target.value;
    //console.log(activeInput);
    this.offersShow.filter = activeInput.trim().toLowerCase();
  }

}
