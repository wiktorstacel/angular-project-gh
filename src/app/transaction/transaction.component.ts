import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { SelectService } from '../home/select.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { ITransactionShow } from './transaction-show';
import { IAgentShow } from './agent-show';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogCancelComponent } from './dialog-cancel/dialog-cancel.component'

export interface BackEndMsg {
  message: string;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  
  transactionForm: FormGroup;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  isDisabled = false;
  public errorMsg: any;
  responseFromMakeTransaction: BackEndMsg = <any>[];
  responseFromCancelTransaction: BackEndMsg = <any>[];
  public activeOffers: Array<{oferta_id: number, opis: string, cena: number}> = [];
  public activeAgents: Array<IAgentShow> = [];
  transactionsShow = new MatTableDataSource<ITransactionShow>();  
  displayedColumns: string[] = ['tranzakcja_id','ofertaNazwa','ofertaUlica','agentNazwisko','transakcjaKlient','ofertaCena','transakcjaData','anuluj'];

  constructor(                
                private _http: HttpService,
                private _selectService: SelectService, 
                private fb: FormBuilder,
                public dialog: MatDialog,
                private snackBar: MatSnackBar
              ) {
    this.transactionForm = fb.group({});
    this.paginator = <any>[];
  }

  ngOnInit(): void {
    
    this.transactionForm = this.fb.group({
      id: [null, Validators.required],
      agent: [null, Validators.required],
      price: [{value: null, disabled: true}, Validators.required],
      client: [null,[
        Validators.required,
        Validators.minLength(3), Validators.maxLength(30),
        Validators.pattern('^(ą| |-|ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]){3,30}$')
      ]]
    });
    
    this._selectService.getActiveOffers().subscribe(
        data => {this.activeOffers = data, console.log(this.activeOffers)},
        error => this.errorMsg = error
    );
    
    const formData : FormData = new FormData();
    formData.append('status', '1');
    this._selectService.onCallAgents(formData).subscribe(
        data => this.activeAgents = data,
        error => this.errorMsg = error
    );
    
  }
  
  onSubmitDoTransaction(formDirective: FormGroupDirective) {
    console.log(this.transactionForm.value);
    this.isDisabled = true;//submit button
    this._http.onSubmitTransaction(this.transactionForm.value).subscribe(
      res => {
        console.log(res);
        this.responseFromMakeTransaction = res;
      },
      err => {
        console.log(err);
      },
      () => { //CALBACK1
        setTimeout(()=>{
        this.responseFromMakeTransaction = <any>[];
        }, 10000);
        //reload of active offers
        this._selectService.getActiveOffers().subscribe(
        data => {this.activeOffers = data, console.log(this.activeOffers)},
        error => this.errorMsg = error,
        () => { //CALBACK2
          formDirective.resetForm();//https://stackoverflow.com/questions/48216330/angular-5-formgroup-reset-doesnt-reset-validators
          this.transactionForm.reset();
          //console.log(this.transactionForm);
          this.isDisabled = false;
        }
        );
      }
    )
  }
  
  onChangeFillForm(id: number) {
//    setTimeout(()=>{ 
      for(let a=0; a<this.activeOffers.length; a++)
      {
        if(this.activeOffers[a].oferta_id === id)
        {
          this.transactionForm.patchValue({
          price: this.activeOffers[a].cena
          })
        }
      }
//    }, 1000);
  }
  
  onTransactionsShow() {
    this._http.getTransactions().subscribe(
      res => {
        console.log(res);
        this.transactionsShow.data = res;
        this.transactionsShow.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    )
  }
  
  onTransactionTopShow() {
    this._http.getTransactionTop().subscribe(
      res => {
        console.log(res);
        this.transactionsShow.data = res;
        this.transactionsShow.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    )
  }
  
  cancelTransaction(id: string) {
    let dialogRef = this.dialog.open(DialogCancelComponent, {data: {nr: id}});   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == 'true')
      {
        const formData : FormData = new FormData();
        formData.append('id', id);
        this._http.onSubmitCancelTransaction(formData).subscribe(
            data => this.responseFromCancelTransaction = data,
            error => {this.errorMsg = error; console.log(error);},
            () => {
              this.onTransactionsShow();
              this.snackBar.open(this.responseFromCancelTransaction.message, 'Zamknij', {duration: 5000});
            }
        );
      }
    });
  }
  
  //https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
  applyFilter(event: KeyboardEvent) {
    //console.log(event);
    const target = event.target as HTMLTextAreaElement;
    var activeInput = target.value;
    //console.log(activeInput);
    this.transactionsShow.filter = activeInput.trim().toLowerCase();
  }
  
  get id() {return this.transactionForm.get('id');}
  get agent() {return this.transactionForm.get('agent');}
  get client() {return this.transactionForm.get('client');}

}
