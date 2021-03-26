import {Component, OnInit, TemplateRef} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AppComponent} from "../app.component";
import {Stock} from "../classes/Stock";
import {DataStockService} from "../services/data.stock.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public appComponent: AppComponent,
              public homeComponent: HomeComponent,
              private dataStockService: DataStockService,) { }

  public qty: number=1;
  public id: number;
  public stock: Stock;
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      this.id = +params.get("id")
    });
    this.loadProduct();
  }

  isProduct() {
    for(var i=0; i<this.homeComponent.stocks.length; i++){
      if(this.homeComponent.stocks[i].product.id==this.id){
        return this.homeComponent.stocks[i];
      }
    }
  }

  loadProduct() {
    this.stock = this.homeComponent.stocks.find(stock => stock.product.id== this.id);
    if(!this.stock){
      this.dataStockService.getStocks().subscribe(data => {
          this.stock = data.find(s=>{
            return s.product.id==this.id;
          });
      });
    }
    this.isLoading = false;
  }

  add() {
    this.qty+=1;
  }

  remove(){
    if(this.qty>0) {
      this.qty -= 1;
    }
  }

}
