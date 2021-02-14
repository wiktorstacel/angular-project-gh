import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code1',
  templateUrl: './code1.component.html',
  styleUrls: ['./code1.component.scss']
})
export class Code1Component implements OnInit {
  
  topics = ['Angular', 'React', 'Vue'];

  constructor() { }

  ngOnInit(): void {
  }

}
