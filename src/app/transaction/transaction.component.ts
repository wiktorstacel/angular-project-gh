import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ITransactionShow } from './transaction-show';
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  transactionsShow = new MatTableDataSource<ITransactionShow>();  
  displayedColumns: string[] = ['tranzakcja_id','ofertaNazwa','ofertaUlica','agentNazwisko','transakcjaKlient','ofertaCena','transakcjaData','anuluj'];
  /*tranzakcja_id: number,
  ofertaNazwa: string,
  agentNazwisko: string,
  agentImie: string
  transakcjaKlient: string,
  transakcjaData: string,
  ofertaCena: number,
  miejscowoscNazwa: string,
  ofertaUlica: string,
  agentStatus: number*/

  constructor(                
                private _http: HttpService, 
                private fb: FormBuilder
              ) {
    this.paginator = <any>[];
  }

  ngOnInit(): void {
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
  
  cancelTransaction(id: number) {
    
  }
  
  applyFilter(filterValue: string) {
    this.transactionsShow.filter = filterValue.trim().toLowerCase();
  }

}
