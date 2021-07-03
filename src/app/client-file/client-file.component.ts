import { Component, OnInit } from '@angular/core';
import { faChevronDown, faSun, faPlus, faPaperclip, faSearch, faEye, faStar, faCertificate, faCloudMoonRain, faCircle } from '@fortawesome/free-solid-svg-icons';
import  { faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import * as Highcharts from "highcharts";
import {Account, Note, Client} from './client-file.client';
import { ClientService } from './client-file.service';

@Component({
  selector: 'app-client-file',
  templateUrl: './client-file.component.html',
  styleUrls: ['./client-file.component.css'],
  providers: [ClientService]
})
export class ClientFileComponent implements OnInit {

  clients: Client[] = [];

  getClients(): void {
    this.clientService.getClients().subscribe(clients => (this.clients = clients));
  }

  addClient(): void {
    
  }


  control = new FormControl();

  clients_name: string[] = [];

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

  constructor(private clientService: ClientService) { 
    this.getClients();
  }

  ngOnInit(): void {
    this.filteredClients = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


}
