import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {CartLine} from "../classes/CartLine";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
  }

  ChangeQuantity(cl: CartLine, increaseQuantity: Boolean) {
    if(increaseQuantity){
      cl.quantity+=1;
    }else{
      if(cl.quantity>1){
        cl.quantity-=1;
      }else{
        this.appComponent.cart.deleteLine(cl);
      }
    }
    this.appComponent.cart.updateTotal();
  }

  deleteLine(c: CartLine) {
    this.appComponent.cart.deleteLine(c);
  }

}
