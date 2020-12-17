import { Component, OnInit } from '@angular/core';
import {DataProductService} from "../services/data.product.service";
import {FamilyProduct} from "../classes/FamilyProduct";
import {AppComponent} from "../app.component";
import {CartLine} from "../classes/CartLine";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: 'Estas seguro?',
      text: "estas seguro que deseas borrar el producto " + line.product.name + "?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#00B0F0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appComponent.cart.deleteLine(line);
        Swal.fire(
          'Borrado!',
          'El producto se borro de tu pedido',
          'success'
        )
      }
    })
  }

}
