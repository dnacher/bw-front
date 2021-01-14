import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {Cart} from "../classes/Cart";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  constructor(public appComponent: AppComponent) { }

  public cart:Cart;

  ngOnInit() {
    this.cart = this.appComponent.cart;
    this.appComponent.cart = new Cart();
    this.appComponent.deleteCartLocalStorage();
  }

}
