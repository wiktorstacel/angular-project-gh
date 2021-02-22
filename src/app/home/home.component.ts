import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../employee';
import { HttpService } from '../http.service';
//import { User } from './user'; - for purpose of usage ngModel - TDF
import { FormBuilder, FormGroup } from '@angular/forms'

//import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  response = "";
  searchOfferForm: FormGroup;
    
  clickCounter: number = 0;
  name: string = 'hey';
  public employees: Array<{id: number, name: string, age: number}> = []; //Array<{id: number, name: string, age: number}> //Array<Object>
  public errorMsg: any;


  constructor(private _employeeService: EmployeeService, private _http: HttpService, private fb: FormBuilder) { 
    this.searchOfferForm = fb.group({});
  }

  ngOnInit(): void {
    this.searchOfferForm = this.fb.group({
    p6: [false],
    p7: [false]
    });
    
    
    //this.employees = this._employeeService.getEmployees(); - it was to get data that were declareted in method in employee.service
    this._employeeService.getEmployees().subscribe(
        data => this.employees = data,
        error => this.errorMsg = error
      );
  }
  
  countClick(){
      this.clickCounter += 1;
  }
  
  setClasses() {
    let myClasses = {
        active: this.clickCounter > 4,
        noactive: this.clickCounter <= 4
        }
    return myClasses;
  }
  
  onSendShowOffers(p6: any) {
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
  }
  
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
        this.response = res;
      },
      err => {
        console.log(err);
      }
    )
  }

}
