import {Component, OnInit} from '@angular/core';
import {MetaData} from "../classes/metaData";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStockService} from "../services/data.stock.service";
import {Stock} from "../classes/Stock";
import {AppComponent} from "../app.component";
import Swal from "sweetalert2";
import {DataProductService} from "../services/data.product.service";
import {FamilyProduct} from "../classes/FamilyProduct";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public metaDataList: Array<MetaData> = [];
  public id: string='';
  public familyProducts: Array<FamilyProduct> = [];
  public stocks: Array<Stock> = [];
  public textSearch: string = '';
  public param: string;
  constructor(private dataStockService: DataStockService,
              private dataProductService: DataProductService,
              private router: Router,
              public appComponent: AppComponent,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.param = params.get("familyProduct")
    });
    if(this.param){
      this.appComponent.familyProductSelected=this.param;
    }
    this.loadFamilyProducts();
    this.loadMetaData();
    this.appComponent.checkCart();
    this.loadProduct();
  }

  loadFamilyProducts(){
    this.dataProductService.getFamilyProducts().subscribe(data =>{
      this.familyProducts = data;
      if(this.param!=null){
        this.appComponent.familyProductSelected= this.param;
      }else{
        this.appComponent.familyProductSelected= this.familyProducts[0].name;
      }
    });
  }

  public loadProduct(){
    this.stocks= new Array<Stock>();
    this.dataStockService.getStocks().subscribe(data => {
      this.stocks = data;
      if(this.appComponent.familyProductSelected!='Todo'){
        let newStocks: Array<Stock> = [];
        for(let stock of this.stocks){
          if(stock.product.familyProduct.name==this.appComponent.familyProductSelected){
            newStocks.push(stock);
          }
        }
        this.stocks = newStocks;
      }
    });
  }

  public loadProductOnName(){
    this.dataStockService.getStocks().subscribe(data => {
      this.stocks = data;
      this.stocks = this.stocks.filter(s=>{
          return s.product.name.startsWith(this.textSearch);
        });
    });
  }

  loadMetaData(){
    this.metaDataList.push(new MetaData('Diferente','../../assets/img/shop01.png'),
                          new MetaData('Familiar','../../assets/img/shop02.png'),
                          new MetaData('Ensaladas','../../assets/img/shop03.png'));
  }

  private selectProduct(stock: Stock, value: number) {
    this.appComponent.processAddProduct(stock,value);
  }

  goToProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  displayMessage(nombre: string){
    Swal.fire({
      icon: "success",
      title: 'Producto Agregado',
      html: 'Se agrego '+ nombre,
      timer: 900,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  selectProductValue(stock: Stock) {
     let value = Swal.fire({
      icon:"question",
      imageUrl: stock.product.imageUrl,
      imageWidth: 200,
      imageHeight: 200,
      title: stock.product.name,
      input:"number",
       inputValue: 1,
      html: 'Producto '+ stock.product.name,
      confirmButtonText: 'Agregar'
    });
     value.then(val=>{
       if(val.value>0){
         let value:number = parseInt(val.value);
         this.selectProduct(stock,value);
       }
     });
  }

  onChange() {
    if(this.appComponent.familyProductSelected!='Todo'){
      this.router.navigate(['/category/',this.appComponent.familyProductSelected]).then();
    }else{
      this.router.navigate(['/']).then();
    }
    this.loadProduct();
  }

  loadFamilyProductsPromotion(familyProduct: string) {
    if(familyProduct!='Diferente'){
      this.appComponent.familyProductSelected=familyProduct;
    }else{
      const random = Math.floor(Math.random() * this.familyProducts.length);
      this.appComponent.familyProductSelected= this.familyProducts[random].name;
    }
    this.loadProduct();
  }
}
