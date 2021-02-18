import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service'; //for needs of Angular+PHP server data exchange
//OUR COMPONENTS
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

import { ArrayFormComponent } from './array-form/array-form.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { NestedFormComponent } from './nested-form/nested-form.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { ValidFormComponent } from './valid-form/valid-form.component';

import { Code1Component } from './code1/code1.component';
import { OfferComponent } from './offer/offer.component';
import { ReactiveComponent } from './reactive/reactive.component';
//MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ArrayFormComponent,
    BasicFormComponent,
    NestedFormComponent,
    SubmitFormComponent,
    ValidFormComponent,
    Code1Component,
    OfferComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
