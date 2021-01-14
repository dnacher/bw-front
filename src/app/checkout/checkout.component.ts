import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../classes/User";
import {Address} from "../classes/Address";
import {DataCartService} from "../services/data.cart.service";
import {DataUserService} from "../services/data.user.service";
import {DataAddressService} from "../services/data.address.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(public appComponent: AppComponent,
              public spinner: NgxSpinnerService,
              public cartService: DataCartService,
              public userService: DataUserService,
              public addressService: DataAddressService,
              public router: Router) { }

  public user:User;
  public address: Address;

  ngOnInit() {
    this.appComponent.checkCart();
    this.user= new User();
    this.address= new Address();
  }

  onCheckout() {
       let user = this.userService.register(this.user).subscribe(u =>{
         this.appComponent.cart.cartHeader.user = u;
         this.address.user = u;
       });
        this.addressService.saveAddress(this.address).subscribe();
        this.cartService.saveCart(this.appComponent.cart).subscribe(
          data =>{
            this.appComponent.cart = data;
          }
        );
        this.spinner.show().then(p => {
          setTimeout(() => {
            this.spinner.hide();
            this.router.navigate(['/thankyou']);
          }, 2000);
        });
  }
}
