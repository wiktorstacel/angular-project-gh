import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { ArrayFormComponent } from './array-form/array-form.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'basic', component: BasicFormComponent },
    { path: 'nested', component: NestedFormComponent },
    { path: 'array', component: ArrayFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
