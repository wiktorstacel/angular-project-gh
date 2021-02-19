import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department-list',
  template: `
  <h3>
  Department List
  </h3>
  <ul class="list-group">
    <li (click)="onSelect(department)" [class.active]="isSelected(department)" *ngFor="let department of departments" class="list-group-item">
      <span class="badge">{{department.id}}</span> {{department.name}}
    </li>
  </ul>
  `,
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  
  public selectedId: any;
  departments = [
    {"id": 1, "name": "Angular"},
    {"id": 2, "name": "Node"},
    {"id": 3, "name": "MongoDB"},
    {"id": 4, "name": "Ruby"},
    {"id": 5, "name": "Bootstrap"},
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.selectedId = id;
    });
  }
  
  onSelect(department: any) {
    this.router.navigate(['/departments', department.id]);
  }
  
  isSelected(department: any) {
    return department.id == this.selectedId;//===
  }

}
