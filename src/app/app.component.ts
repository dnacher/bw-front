import { Component } from '@angular/core';
import {Cart} from "./classes/Cart";
import {CartLine} from "./classes/CartLine";
import {isNull} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bw-front';
  public cart = new Cart();
}
