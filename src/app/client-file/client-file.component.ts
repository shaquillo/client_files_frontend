import { Component, OnInit } from '@angular/core';
import { faChevronDown, faSun, faPlus, faPaperclip, faSearch, faEye, faStar, faCertificate, faCloudMoonRain, faCircle } from '@fortawesome/free-solid-svg-icons';
import  { faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import * as Highcharts from "highcharts";
import {Account, Note, Client, Status} from './client-file.client';
import { ClientService } from './client-file.service';
import { DatePipe } from '@angular/common';
import * as fileSaver from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-file',
  templateUrl: './client-file.component.html',
  styleUrls: ['./client-file.component.css'],
  providers: [ClientService]
})
export class ClientFileComponent implements OnInit {

   noteForm = this.formBuilder.group({
      creation_date: '',
      note: '',
      status: '',
      document_status: '',
      filename: '',
      offer: '',
      offer_date: '',
   });

   clientInfo = this.formBuilder.group({
    name: '',
    profession: '',
    category: '', 
    tel: '',
    email: '', 
    address: '',
    town: '',
    linkedIn_link: '',
    cp: '',
    notation: '',
   });

   status = {
     inprogress: "INPROGRESS",
     pending: "PENDING",
     treated: "TREATED"
   }

   file:any;
   filename: string = '';
   datasource = new  MatTableDataSource<Note>();

   onSelectFile(event: any){
     this.file = event.target.files[0];
     console.log(this.file);
   }

   onSubmit(){
    console.warn('Submitted client form: ', this.clientInfo.value);
    console.warn('Submitted selected client form: ', this.selected_client);
    let today = new Date().toLocaleDateString();
    this.noteForm.value.creation_date = this.datepipe.transform(today, 'dd-MM-yyyy');
    this.noteForm.value.offer_date = this.datepipe.transform(this.noteForm.value.offer_date, 'dd-MM-yyyy');

    // this.noteForm.value.file = this.file;
    // this.noteForm.value.filename = this.file.;
    
    // this.noteForm.value.file = this.noteForm.value.file.data;

    this.selected_client.account.score = this.account_table.score;
    this.selected_client.account.ratio = this.account_table.ratio;
    this.selected_client.account.risk = this.account_table.risk;

    if(this.file !== null && this.file !== undefined){
      this.clientService.uploadNoteDoc(this.file).subscribe(respons => {
        console.log('file upload response and filename: ' + respons + ' <-> ' + respons.filename);
        this.noteForm.value.filename = respons.filename;
        
        console.warn('Submitted note form: ', this.noteForm.value);
        this.selected_client.notes.push(this.noteForm.value);
        this.addClient(this.selected_client);
        this.datasource.data = this.selected_client.notes;
        this.noteForm.reset();     
      });
    } else {
      console.warn('Submitted note form: ', this.noteForm.value);
      this.selected_client.notes.push(this.noteForm.value);
      this.addClient(this.selected_client);
      this.datasource.data = this.selected_client.notes;
      this.noteForm.reset();
    }

    // if(this.file !== null && this.file !== undefined){
    //   this.uploadFile(this.file);
    //   this.noteForm.value.filename = this.filename;
    //   console.log('uploaded file name: ' + this.filename);
    //   this.filename = '';
    // }
    // console.warn('Submitted note form: ', this.noteForm.value);
    // // this.getClients;
    // this.selected_client.notes.push(this.noteForm.value);
    
   }

  clients: Client[] = [];

  selected_client: Client;
  added_client: Client;
  tmp_client: Client;

  account_table = {
    score: 0,
    ratio: 0,
    risk: 0
  }

  empty_client: Client = {
    id: "",
    name: "",
    profession: "",
    category: "", 
    tel: "",
    email: "", 
    address: "",
    town: "Adamawa",
    linkedIn_link: "",
    cp: "",
    notation: 0,
    notes: [],
    account: {
      score: 0,
      ratio: 0,
      risk: 0,
      status: Status.PENDING,
      investment_plan: "continous"
    }
  } ;

  getClients(): void {
    this.clientService.getClients().subscribe(clients => {
      console.log(clients);
      this.clients = clients;
      console.log("clients: " + this.clients.length);
      this.setClientsName();
    });
  }

  addClient(client: Client): void {
    this.clientService.postClient(client).subscribe(client => this.clients.push(client));
  }

  // updateClient(client: Client): void {
  //   this.clientService.updateClient(client);
  // }

  uploadFile(file:File): void {
    this.clientService.uploadNoteDoc(file).subscribe(filename => this.filename = filename);
  }

  downloadFile(filename: string): void {
    this.clientService.downloadNoteDoc(filename).subscribe( (file: any) => {
      console.log(file);
      // let blob:any = new Blob([file], { type: 'application/pdf' });
      // console.log(blob);
      // let url = window.URL.createObjectURL(file.body);
      // window.open(url);
      // fileSaver.saveAs(blob, filename);
      }
    );

  }

  displayedColumns: string[] = ['date', 'note', 'status', 'document_status', 'offer', 'offer_date']


  control = new FormControl();

  clients_name: string[] = [];

  filteredClients: Observable<string[]> = this.control.valueChanges.pipe(startWith(''),
    map(value => this._filter(value)));
  
  private _filter(value: string): string[] {
    let client_to_select = this.clients.find(client => client.name === value);
    if( client_to_select !== undefined){
      this.selected_client = client_to_select;
      this.datasource.data = this.selected_client.notes;
    } else {
      this.selected_client = this.empty_client ;
      this.datasource.data = [];
    }
    const filterValue = this._normalizeValue(value);
    return this.clients_name.filter(client => this._normalizeValue(client).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: "Evolution CA / Bénéfice"
    },
    xAxis:{
      categories:["Jan", "Fév", "Mar", "Avr", "Mai", "Jui"]
    },
    yAxis: {          
        title:{
          text:"K Euros"
        } 
    },
    plotOptions : {
      area: {
         fillOpacity: 0.5,
      }
   },
    legend : {
      layout: 'vertical',
      align: 'center',
      verticalAlign: 'top',
      x: 10,
      y: 30,
      floating: true,
      borderWidth: 0,
     
      backgroundColor: '#FFFFFF'
     },
    series: [
      {
        name: "CA",
        type: "spline",
        data: [1400, 900, 1500, 1200, 1300, 1700]
      },
      {
        name: "Bénéfice",
        type: "areaspline",
        data: [700, 1000, 800, 1400, 600, 1100],
        color: '#6366F1'
      }
      
    ]
  };

  //icons
  chevron_down = faChevronDown;
  linked_icon = faLinkedin;
  notation_icon = faSun;
  plus_icon = faPlus;
  file_upload_icon = faPaperclip;
  search_icon = faSearch;
  eye_icon = faEye;
  check_icon = faCheckCircle;
  uncheck_icon = faTimesCircle;
  score_icon = faStar;
  ratio_icon = faCertificate;
  risk_icon = faCloudMoonRain;
  status_icon = faCircle;

  scoreIcon = this.score_icon;
  ratioIcon = this.ratio_icon;
  riskIcon = this.risk_icon;

  scoreColor = 'text-yellow-500';
  ratioColor  = 'text-black-500';
  riskColor = 'text-red-500';


  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private datepipe: DatePipe) { 
    this.getClients();
    this.selected_client = this.empty_client;
    this.added_client = this.empty_client;
    this.tmp_client = this.empty_client;

    // this.client = this.clients[0];
    // console.log("clients: " + this.clients.length);
  }

  ngOnInit(): void {
    this.filteredClients = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  setClientsName(){
    this.clients_name = []
    for(let client of this.clients){
      this.clients_name.push(client.name);
    }
  }


}
