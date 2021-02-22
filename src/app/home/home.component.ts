import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../employee';
import { HttpService } from '../http.service';
//import { User } from './user'; - for purpose of usage ngModel - TDF

//import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  response = "";
    
  clickCounter: number = 0;
  name: string = 'hey';
  public employees: Array<{id: number, name: string, age: number}> = []; //Array<{id: number, name: string, age: number}> //Array<Object>
  public errorMsg: any;
  
  //userModel = new User('', 'rob@test.com', 4534534535, 'default', 'morning', true);

  constructor(private _employeeService: EmployeeService, private _http: HttpService) { }

  ngOnInit(): void {
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
    console.log(p6);
    const formData : FormData = new FormData();
    formData.append('p6', JSON.stringify(p6));
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

}
