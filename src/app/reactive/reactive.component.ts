import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms'
import { forbiddenNameValidator } from './shared/user-name.validators'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  /*registrationForm = new FormGroup({
    userName: new FormControl('Vishwas'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });*/

  constructor(private fb: FormBuilder) { }
  
  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  })

  ngOnInit(): void {
  }
  
  loadApiData() {
    this.registrationForm.setValue({ //patchValue - not all fields have to be given
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '123456'
      }
    })
  }

}
