import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { SelectService } from '../home/select.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { IPositionAgent } from './position-agent';
import { IAgentShow } from '../transaction/agent-show';
import { IStatFormat } from './stat-format';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogStatusComponent } from './dialog-status/dialog-status.component'

export interface BackEndMsg {
  message: string;
}

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  
  insertAgentForm: FormGroup;
  statisticAgentForm: FormGroup;
  
  isDisabled = false;
  public errorMsg: any;
  responseFromSaveAgent: BackEndMsg = <any>[];
  responseFromChangeAgentStatus: BackEndMsg = <any>[];
  public agentPositions: Array<IPositionAgent> = [];
  public activeAgents: Array<IAgentShow> = [];
  public noactiveAgents: Array<IAgentShow> = [];
  //startDate = new FormControl(new Date(2010, 0, 1)); in case you would like to connect like this in html:[formControl]="startDate"
  startDate = new Date(2010, 0, 1);
  minDate = new Date(2009, 12, 1);
  maxDate = new Date();
  type_stats: string[] = ['Średnia sprzedaż', 'Sprzedaż ogółem', 'Liczba transakcji'];
  
  Show: any;
  statisticShow = new MatTableDataSource<IStatFormat>();  
  displayedColumns: string[] = ['agent_id','agentImie','agentNazwisko','stanowiskoNazwa','sumaSprzedazy','liczbaTransakcji','sredniaSprzedaz'];

  constructor(
                private _http: HttpService,
                private _selectService: SelectService, 
                private fb: FormBuilder,
                public dialog: MatDialog,
                private snackBar: MatSnackBar
              ) {
  this.insertAgentForm = fb.group({});
  this.statisticAgentForm = fb.group({});
  }

  ngOnInit(): void {
    
    this.insertAgentForm = this.fb.group({
      name: [null,[
        Validators.required,
        Validators.minLength(3), Validators.maxLength(20),
        Validators.pattern('^(ą| |-|ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]){3,20}$')
      ]],
      surname: [null,[
        Validators.required,
        Validators.minLength(3), Validators.maxLength(20),
        Validators.pattern('^(ą| |-|ę|ź|ć|ń|ó|ś|ż|ł|Ą|Ę|Ź|Ć|Ń|Ó|Ś|Ż|[a-z]|[A-Z]){3,20}$')
      ]],
      position: [{value: null, disabled: false}, Validators.required]
    });
    
    this._selectService.getAgentPositions().subscribe(
        data => {this.agentPositions = data},
        error => this.errorMsg = error
    );
    
    //STATISTIC FORM INITIALIZING  
    this.statisticAgentForm = this.fb.group({
      employee_stat: [{value: 0, disabled: false}, Validators.required],
      position_stat: [{value: 0, disabled: false}, Validators.required],
      start_date: [this.startDate, Validators.required],
      end_date: [new Date(), Validators.required],
      type_stat: [0, Validators.required]
    });
    
    const formData : FormData = new FormData();
    formData.append('status', '1');
    this._selectService.onCallAgents(formData).subscribe(
        data => this.activeAgents = data,
        error => this.errorMsg = error
    );
    
  }
  
  onSubmitInsertAgent(formDirective: FormGroupDirective) {
    console.log(this.insertAgentForm.value);
    this.isDisabled = true;//submit button
    this._http.onSubmitSaveAgent(this.insertAgentForm.value).subscribe(
      res => {
        console.log(res);
        this.responseFromSaveAgent = res;
      },
      err => {
        console.log(err);
      },
      () => { //CALBACK1
        setTimeout(()=>{
        this.responseFromSaveAgent = <any>[];
        }, 10000);
        //reload of active agents in statistic
        const formData : FormData = new FormData();
        formData.append('status', '1');
        this._selectService.onCallAgents(formData).subscribe(
        data => this.activeAgents = data,
        error => this.errorMsg = error,
        () => { //CALBACK2
          formDirective.resetForm();//https://stackoverflow.com/questions/48216330/angular-5-formgroup-reset-doesnt-reset-validators
          this.insertAgentForm.reset();
          //console.log(this.transactionForm);
          this.isDisabled = false;
        }
        );
      }
    )
  }
  
  onSubmitAgentStatistic() {
    console.log(this.statisticAgentForm.value);
    this._http.onSubmitShowStats(this.statisticAgentForm.value).subscribe(
      res => {
        console.log(res);
        this.statisticShow.data = res;
        //this.offersShow.paginator = this.paginator;
      },
      err => {
        console.log(err);
      },
      () => {//CALLBACK
        this.displayedColumns = ['agent_id','agentImie','agentNazwisko','stanowiskoNazwa','sumaSprzedazy','liczbaTransakcji','sredniaSprzedaz'];
        this.Show = this.statisticShow;
      }
    )
  }
  
  activeAgentList() {
    const formData : FormData = new FormData();
    formData.append('status', '1');
    this._selectService.onCallAgents(formData).subscribe(
        data => {this.activeAgents = data,console.log(this.activeAgents);},
        error => this.errorMsg = error,
        () => {//CALLBACK
          this.displayedColumns = ['agent_id','agentImie','agentNazwisko','stanowiskoNazwa','zwolnij'];
          this.Show = this.activeAgents;
        }
    );    
  }
  
  noactiveAgentList() {
    const formData : FormData = new FormData();
    formData.append('status', '0');
    this._selectService.onCallAgents(formData).subscribe(
        data => {this.noactiveAgents = data,console.log(this.noactiveAgents);},
        error => this.errorMsg = error,
        () => {//CALLBACK
          this.displayedColumns = ['agent_id','agentImie','agentNazwisko','stanowiskoNazwa','przywroc'];
          this.Show = this.noactiveAgents;
        }
    );
  }
  
  //onSubmitChangeAgentStatus
  changeAgentStatus(id: string, name: string, surname: string, status: number) {
    let dialogRef = this.dialog.open(DialogStatusComponent, {data: {name: name, surname: surname}});   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == 'true')
      {
        const formData : FormData = new FormData();
        formData.append('id', id);
        this._http.onSubmitChangeAgentStatus(formData).subscribe(
            data => this.responseFromChangeAgentStatus = data,
            error => {this.errorMsg = error; console.log(error);},
            () => {
              if(status == 1){this.activeAgentList();}
              else {this.noactiveAgentList();}
              this.snackBar.open(this.responseFromChangeAgentStatus.message, 'Zamknij', {duration: 5000});
            }
        );
      }
    });
  }
  
  get name() {return this.insertAgentForm.get('name');}
  get surname() {return this.insertAgentForm.get('surname');}
  get position() {return this.insertAgentForm.get('position');}
  
  get employee_stat() {return this.statisticAgentForm.get('employee_stat');}
  get position_stat() {return this.statisticAgentForm.get('position_stat');}

}
