import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nested-form',
  templateUrl: './nested-form.component.html',
  styleUrls: ['./nested-form.component.scss']
})
export class NestedFormComponent implements OnInit {

  myForm: FormGroup;
  
  constructor(private fb: FormBuilder) { 
        this.myForm = fb.group({
          //email: '',
          //message: 'default message',
          //career: ''
      })
  }

  ngOnInit(): void {
      
      const phone = this.fb.group({
          area: [],
          prefix: [],
          line: [],
      })
      
      this.myForm = this.fb.group({
          email: '',
          homePhone: phone,
          cellPhone: phone
      })
  }

}
