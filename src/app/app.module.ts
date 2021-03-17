import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule} from "@angular/forms";
import { GeneralMenuComponent } from './general-menu/general-menu.component';
import {AdminMenuComponent} from "./admin-dashboard/general-menu/admin-menu.component";
import {AdminHomeComponent} from "./admin-dashboard/admin-home/admin-home.component";
import {AdminFooterComponent} from "./admin-dashboard/footer/admin-footer";
import {AdminBodyComponent} from "./admin-dashboard/body/admin-body.component";
import {HighchartsChartModule} from "highcharts-angular";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    GeneralMenuComponent,
    AdminMenuComponent,
    AdminHomeComponent,
    AdminFooterComponent,
    AdminBodyComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        FormsModule,
        HighchartsChartModule,
    ],
  exports: [
    HomeComponent,AppComponent
  ],
  providers: [HomeComponent,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
