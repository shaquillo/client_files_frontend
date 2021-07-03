import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild(SidebarComponent) sidebar!:SidebarComponent;

  title:string = 'Risk Management';

  ngOnInit(): void {

  }

  setTitle(title:string){
    this.title = title;
  }
}
