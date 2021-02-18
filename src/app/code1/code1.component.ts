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
  errorMsg = "";
  
  userModel = new User('', 'rob@test.com', 4534534535, 'default', 'morning', true);

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
  
  onSubmit(userForm: any) {
    console.log(userForm);
    /*this.submitted = true;
    this._EnrollmentService.enroll(this.userModel).subscribe(
        data => console.log('Success!', data),
        error => this.errorMsg = error.statusText
      )*/
  }

}
