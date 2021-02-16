import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-code1',
  templateUrl: './code1.component.html',
  styleUrls: ['./code1.component.scss']
})
export class Code1Component implements OnInit {
  
  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;
  submitted = false;
  
  userModel = new User('', 'rob@test.com', 453453453, 'default', 'morning', true);

  constructor(private _EnrollmentService: EnrollmentService) { }

  ngOnInit(): void {
  }
  
  validateTopic(value: string) {
    if(value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }
  
  onSubmit() {
    //console.log(this.userModel);
    this.submitted = true;
    this._EnrollmentService.enroll(this.userModel).subscribe(
        data => console.log('Success!', data),
        error => console.log('Error', error)
      )
  }

}
