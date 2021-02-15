import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-code1',
  templateUrl: './code1.component.html',
  styleUrls: ['./code1.component.scss']
})
export class Code1Component implements OnInit {
  
  topics = ['Angular', 'React', 'Vue'];
  
  userModel = new User('', 'rob@test.com', 453453453, '', 'morning', true);

  constructor() { }

  ngOnInit(): void {
  }

}
