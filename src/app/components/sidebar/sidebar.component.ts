import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() titleEmitter = new EventEmitter<string>();

  chevron_right = faChevronRight;

  constructor() { }

  ngOnInit(): void {
    
  }

  changeTitle(title:string){
    this.titleEmitter.emit(title);
  }

}
