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

@Component({
  selector: 'app-client-file',
  templateUrl: './client-file.component.html',
  styleUrls: ['./client-file.component.css'],
  providers: [ClientService]
})
export class ClientFileComponent implements OnInit {

   noteForm = this.formBuilder.group({
      id: '',
      date: '',
      note: '',
      status: '',
      document_status: '',
      document_link: '',
      offer: '',
      offer_date: '',
   });

   onSubmit(){
    console.warn('Your order has been submitted', this.noteForm.value);
    this.getClients;
    // this.addClient(this.clientData.value);
    this.noteForm.reset();
   }

  clients: Client[] = [];

  getClients(): void {
    this.clientService.getClients().subscribe(clients => (this.clients = clients));
  }

  addClient(client: Client): void {
    this.clientService.postClient(client).subscribe(client => this.clients.push(client));
  }

  updateClient(client: Client): void {
    this.clientService.updateClient(client);
  }


  control = new FormControl();

  clients_name: string[] = ["Marry", "Joseph", "Riyad", "Francis", "Fred"];

  filteredClients: Observable<string[]> = this.control.valueChanges.pipe(startWith(''),
    map(value => this._filter(value)));
  
  private _filter(value: string): string[] {
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

  client: Client = {
    id: "",
    name: "Riyad",
    profession: "Student",
    category: "Engineer", 
    tel: "671090017",
    email: "mail@mail.com", 
    address: "Street 5",
    town: "Adamawa",
    linkedIn_link: "linked.com/riyad",
    cp: "8990",
    notation: 1,
    notes: [
      {
        creation_date: "2021-09-13",
        note: "First note",
        status: Status.PENDING,
        document_status: Status.PENDING,
        document_link: "/assets/file",
        offer: "New money demand",
        offer_date: "2020-08-12"
      },
      {
        creation_date: "2021-09-05",
        note: "Second note",
        status: Status.INPROGRESS,
        document_status: Status.PENDING,
        document_link: "/assets/file",
        offer: "New money demand",
        offer_date: "2020-08-12"
      }
    ],
    account: {
      score: 2,
      ratio: 2,
      risk: 2,
      status: Status.PENDING,
      investment_plan: "continous"
    }
  } ;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder) { 
    this.getClients();
    // this.client = this.clients[0];
    console.log("clients: " + this.clients.length);
  }

  ngOnInit(): void {
    this.filteredClients = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


}
