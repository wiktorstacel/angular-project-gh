import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../employee';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    
  clickCounter: number = 0;
  name: string = 'hey';
  public employees: Array<{id: number, name: string, age: number}> = []; //Array<{id: number, name: string, age: number}> //Array<Object>
  public errorMsg: any;

  constructor(private _employeeService: EmployeeService) { }

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

}
