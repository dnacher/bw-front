import { Component, OnInit } from '@angular/core';
import {JwtResponse} from "../../classes/JwtResponse";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-admin-general-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  constructor(public appComponent: AppComponent) { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('jwtResponse',null);
    this.appComponent.jwtResponse = new JwtResponse();
  }
}
