import { Component } from '@angular/core';
import {Cart} from "./classes/Cart";
import {CartLine} from "./classes/CartLine";
import {User} from "./classes/User";
import {JwtResponse} from "./classes/JwtResponse";
import {Stock} from "./classes/Stock";

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
  public allStock: Array<Stock> = [];
  public familyProductSelected:string;

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

  public processAddProduct(stock: Stock, value: number){
    if(!this.cartExist()){
      this.createCart();
    }
    if(this.productExist(stock.product.id)){
      let ind = this.getProductIndexById(stock.product.id);
      this.modifyCartLine(this.cart.cartLines[ind],value);
    }else{
      this.cart.cartLines.push(this.createCartLine(stock,value));
    }
    this.getTotal();
    this.saveCartToLocalStorage(this.cart);
  }

  public processDeleteProduct(cartLine: CartLine){
    this.deleteCartLine(cartLine);
    this.getTotal();
    this.saveCartToLocalStorage(this.cart);
  }

  private deleteCartLine(cartLine: CartLine){
    let ind = this.cart.cartLines.indexOf(cartLine);
    this.cart.cartLines.splice(ind, 1);
  }

  private getCartFromLocalStorage(): Cart{
    return JSON.parse(localStorage.getItem('cart'));
  }

  private saveCartToLocalStorage(cart: Cart){
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  private cartExist(): boolean{
    if(this.cart==null){
      if(localStorage.getItem('cart')){
        this.cart = this.getCartFromLocalStorage();
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }

  //create Cart and save it to the LocalStorage
  private createCart(){
    this.cart = new Cart();
    this.saveCartToLocalStorage(this.cart);
  }

  private productExist(id: number): boolean{
    return this.cart.cartLines.some(stock => stock.product.id==id);
  }

  private createCartLine(stock: Stock, value: number): CartLine{
    let cartLine= new CartLine();
    cartLine.product = stock.product;
    cartLine.quantity = value;
    cartLine.subTotal = cartLine.quantity * stock.product.price;
    cartLine.cartHeader = this.cart.cartHeader;
    return cartLine;
  }

  private modifyCartLine(cartLine: CartLine, value: number){
    var y: number = +value;
    cartLine.quantity+= y;
    cartLine.subTotal= cartLine.quantity*cartLine.product.price;
  }

  private getProductIndexById(id: number): number{
    let ind = -1;
    this.cart.cartLines.forEach(cl =>{
      if(cl.product.id===id){
        ind = this.cart.cartLines.indexOf(cl);
        return ind;
      }
    });
    return ind;
  }

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
          this.cart= JSON.parse(localStorage.getItem('cart'));
        }
      }
    }
  }

  public deleteCartLocalStorage(){
    localStorage.removeItem('cart');
  }

  public updateTotal(){
    this.getTotal();
    this.saveCartToLocalStorage(this.cart);
  }

  getTotal(){
    let total=0;
    for(let i=0; i<this.cart.cartLines.length;i++){
      total+=this.cart.cartLines[i].quantity*this.cart.cartLines[i].product.price;
    }
    this.cart.cartHeader.total=total;
  }

}
