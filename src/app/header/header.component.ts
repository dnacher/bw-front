import { Component, OnInit } from '@angular/core';
import {DataProductService} from "../services/data.product.service";
import {FamilyProduct} from "../classes/FamilyProduct";
import {AppComponent} from "../app.component";
import {CartLine} from "../classes/CartLine";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataProductService: DataProductService,
              private appComponent: AppComponent) { }

  private familyProducts: Array<FamilyProduct> = [];

  ngOnInit() {
    this.loadFamilyProducts();
  }

  loadFamilyProducts(){
    this.dataProductService.getFamilyProducts().subscribe(data =>{
      this.familyProducts = data;
    });
  }

  deleteLine(line: CartLine) {
    this.appComponent.cart.deleteLine(line);
  }

}
