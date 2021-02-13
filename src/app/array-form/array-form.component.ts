import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-array-form',
  templateUrl: './array-form.component.html',
  styleUrls: ['./array-form.component.scss']
})
export class ArrayFormComponent implements OnInit {
      
  constructor(private fb: FormBuilder) { }                       

  ngOnInit(): void {
  }
}
