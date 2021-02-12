import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
    
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
      this.myForm = fb.group({
          //email: '',
          //message: 'default message',
          //career: ''
      })
       }

  ngOnInit(): void {
      this.myForm = this.fb.group({
          email: '',
          message: '',
          career: ''
      })
      
      this.myForm.valueChanges.subscribe(console.log)
  }

}
