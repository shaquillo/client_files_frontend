import { Component, Input, OnInit } from '@angular/core';
import { faBell, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "";

  bell_icon = faBell;
  user_icon = faUser;
  logout_icon = faPowerOff;

  constructor() { }

  ngOnInit(): void {
  }

}
