import { Component } from '@angular/core';
import {Cart} from "./classes/Cart";
import {CartLine} from "./classes/CartLine";
import {User} from "./classes/User";
import {JwtResponse} from "./classes/JwtResponse";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bw-front';
  public cart = new Cart();
  public user: User;
  public jwtResponse: JwtResponse= new JwtResponse();

  public checkCart(){
    if(this.cart==null){
      if(localStorage.getItem('cart')){
        this.cart= JSON.parse(localStorage.getItem('cart'));
      }else{
        this.cart = new Cart();
      }
    }else{
      if(this.cart.cartLines==null){
        this.cart.cartLines= new Array;
      }
      if(this.cart.cartLines.length<1){
        if(localStorage.getItem('cart')){
          var test:string = localStorage.getItem('cart').toString();
          this.cart= JSON.parse(localStorage.getItem('cart'));
        }
      }
    }
  }

  public isAuthenticated(): boolean{
    if(this.jwtResponse.token!==null){
      let now = new Date();
      this.jwtResponse.expirationDate = new Date(this.jwtResponse.expirationDate);
      if(now<this.jwtResponse.expirationDate){
        return true;
      }
    }
    return false;
  }

  public isAdmin(): boolean {
    if(this.isAuthenticated()){
      return this.jwtResponse.user.userType.name=='Admin';
    }else{
      return false;
    }
  }

  public saveCartLocalStorage(){
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }

  public deleteCartLocalStorage(){
    localStorage.removeItem('cart');
  }

  public updateTotal(){
    let total=0;
    for(let x=0; x<this.cart.cartLines.length;x++){
      total+=this.cart.cartLines[x].quantity*this.cart.cartLines[x].product.price;
    }
    this.cart.cartHeader.total=total;
    this.saveCartLocalStorage();
  }

  public deleteCartLine(line: CartLine) {
    let ind = this.cart.cartLines.indexOf(line);
    this.cart.cartLines.splice(ind,1);
    this.updateTotal();
  }
}
