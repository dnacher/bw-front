import { Component, OnInit } from '@angular/core';
import {MetaData} from "../classes/metaData";
import {Router} from "@angular/router";
import {DataStockService} from "../services/data.stock.service";
import {Stock} from "../classes/Stock";
import {CartLine} from "../classes/CartLine";
import {AppComponent} from "../app.component";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private metaDataList: Array<MetaData> = [];
  private stocks: Array<Stock> = [];

  constructor(private dataStockService: DataStockService,
              private router: Router,
              private appComponent: AppComponent,
              private toast: ToastrService) { }

  ngOnInit() {
    this.loadMetaData();
    this.loadProduct();
  }

  loadMetaData(){
    this.metaDataList.push(new MetaData('Pescados','../../assets/img/shop01.png'),
                          new MetaData('Carnes','../../assets/img/shop02.png'),
                          new MetaData('Pasta','../../assets/img/shop03.png'));
  }

  loadProduct(){
    this.dataStockService.getStocks().subscribe(data => {
        this.stocks = data;
      });
  }


  selectProduct(stock: Stock, value: number) {
    let cartLine = this.createCartLine(stock,value);
    if(this.appComponent.cart.cartLines.length==0) {
      this.appComponent.cart.cartLines.push(cartLine);
    }else{
      let ind = this.checkCartLine(cartLine.product.id);
      if(ind!=-1){
        cartLine.quantity = this.appComponent.cart.cartLines[ind].quantity;
        this.modifyCartLine(cartLine,value);
        this.appComponent.cart.cartLines[ind] = cartLine;
      }else{
        this.appComponent.cart.cartLines.push(cartLine);
      }
    }
    this.getTotal();
    // @ts-ignore
    localStorage.setItem('cart', this.appComponent.cart);
    this.displayMessage(stock.product.name)
  }

  getTotal(){
    let total = 0;
    this.appComponent.cart.cartLines.forEach(cl =>{
      total+= cl.subTotal;
    });
    this.appComponent.cart.cartHeader.total = total;
  }

  checkCartLine(id: number){
    let ind = -1;
    this.appComponent.cart.cartLines.forEach(cl =>{
      if(cl.product.id===id){
        ind = this.appComponent.cart.cartLines.indexOf(cl);
        return ind;
      }
    });
    return ind;
  }

  modifyCartLine(cartLine: CartLine, value: number){
    var y: number = +value;
    cartLine.quantity+= y;
    cartLine.subTotal= cartLine.quantity*cartLine.product.price;
  }

  createCartLine(stock: Stock, value: number): CartLine{
    let cartLine= new CartLine();
    cartLine.product = stock.product;
    cartLine.quantity = +value;
    cartLine.subTotal = cartLine.quantity * stock.product.price;
    cartLine.cartHeader = this.appComponent.cart.cartHeader;
    return cartLine;
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  displayMessage(nombre: string){
    Swal.fire({
      icon: "success",
      title: 'Producto Agregado',
      html: 'Se agrego '+ nombre,
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  selectProductValue(stock: Stock) {
     let value = Swal.fire({
      icon:"question",
      title: stock.product.name,
      input:"number",
       html: 'Producto '+ stock.product.name,
      cancelButtonText: 'Cancelar',
       confirmButtonText: 'Agregar'
    });
     value.then(val=>{
       let value:number = val.value;
       this.selectProduct(stock,value);
     });
  }
}
