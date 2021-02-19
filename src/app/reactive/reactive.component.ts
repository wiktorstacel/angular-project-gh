import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { forbiddenNameValidator } from './shared/user-name.validators'
import { PasswordValidator } from './shared/password.validator'

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
  
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.registrationForm = fb.group({});
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
    email: [''],
    subscribe_ch: [false],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  }, {validator: PasswordValidator});
  
  this.registrationForm.get('subscribe_ch')?.valueChanges.subscribe(checkedValue => {
    const email = this.registrationForm.get('email');
    if(checkedValue) {
      email?.setValidators(Validators.required);
    } else {
      email?.clearValidators();
    }
    email?.updateValueAndValidity();
    });
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
