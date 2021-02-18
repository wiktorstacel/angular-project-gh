import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { ArrayFormComponent } from './array-form/array-form.component';
import { ValidFormComponent } from './valid-form/valid-form.component';
import { Code1Component } from './code1/code1.component';
import { OfferComponent } from './offer/offer.component';
import { ReactiveComponent } from './reactive/reactive.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'basic', component: BasicFormComponent },
    { path: 'nested', component: NestedFormComponent },
    { path: 'array', component: ArrayFormComponent },
    { path: 'valid', component: ValidFormComponent },
    { path: 'code1', component: Code1Component },
    { path: 'offer', component: OfferComponent },
    { path: 'reactive', component: ReactiveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
