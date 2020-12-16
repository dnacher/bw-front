import {CartHeader} from "./CartHeader";
import {CartLine} from "./CartLine";

export class Cart{
  cartHeader: CartHeader;
  cartLines:CartLine[];

  constructor() {
    this.cartHeader= new CartHeader();
    this.cartLines= new Array();
  }

  public updateTotal(){
    let total=0;
    for(let x=0; x<this.cartLines.length;x++){
      total+=this.cartLines[x].quantity*this.cartLines[x].product.price;
    }
    this.cartHeader.total=total;
  }

  public deleteLine(line: CartLine) {
    let ind = this.cartLines.indexOf(line);
    this.cartLines.splice(ind,1);
    this.updateTotal();
  }
}
