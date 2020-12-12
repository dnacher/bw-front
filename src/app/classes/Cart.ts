import {CartHeader} from "./CartHeader";
import {CartLine} from "./CartLine";

export class Cart{
  cartHeader: CartHeader;
  cartLines:CartLine[];

  constructor() {
    this.cartHeader= new CartHeader();
    this.cartLines= new Array();
  }
}
