import {CartHeader} from "./CartHeader";
import {Product} from "./Product";

export class CartLine {
  id: number;
  cartHeader: CartHeader;
  product: Product;
  quantity: number;
  subTotal: number;
}
