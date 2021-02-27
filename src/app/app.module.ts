import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service'; //for needs of Angular+PHP server data exchange
import { EmployeeService } from './employee.service';
import { SelectService } from './home/select.service';

//MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TransactionComponent } from './transaction/transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TransactionComponent
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
    MatChipsModule,
    MatToolbarModule,
    TextFieldModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    HttpService,
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
