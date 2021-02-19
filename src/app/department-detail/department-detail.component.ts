import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  template: `
    <h3>You've selected department id = {{departmentId}}</h3>
    <a (click)="goPrevious()">Previous</a>
    <a (click)="goNext()"> Next</a>
    
    <div>
      <button (click)="gotoDepartments()" class="btn btn-secondary btn-sm">Back</button>
    </div>
  `,
  styles: [
  ]
})
export class DepartmentDetailComponent implements OnInit {

  public departmentId: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));//doesn't work - remove parseInt
    //this.departmentId = id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.departmentId = id;
    });
  }
  
  goPrevious() {
    let previousId = this.departmentId - 1;
    this.router.navigate(['/departments', previousId])
  }
  
  goNext() {
    let nextId = this.departmentId++; //+1 add 1 digit more 1..11..111
    this.router.navigate(['/departments', nextId])
  }
  
  gotoDepartments() {
    let selectedId = this.departmentId ? this.departmentId : null;
    this.router.navigate(['/departments',{id: selectedId}]);
  }

}