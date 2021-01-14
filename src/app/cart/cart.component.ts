import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {CartLine} from "../classes/CartLine";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public appComponent: AppComponent) { }

  ngOnInit() {
  }

  ChangeQuantity(cl: CartLine, increaseQuantity: Boolean) {
    if(increaseQuantity){
      cl.quantity+=1;
    }else{
      if(cl.quantity>1){
        cl.quantity-=1;
      }else{
        Swal.fire({
          title: 'Estas seguro?',
          text: "estas seguro que deseas borrar el producto " + cl.product.name + " de tu carrito?",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#00B0F0',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Borrarlo!',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Borrado!',
              'El producto se borro de tu pedido',
              'success'
            )
            this.appComponent.deleteCartLine(cl);
          }
        })
      }
    }
    this.appComponent.updateTotal();
  }

  deleteLine(c: CartLine) {
    this.appComponent.deleteCartLine(c);
  }

}
