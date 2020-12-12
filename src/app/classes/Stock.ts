import {FamilyProduct} from "./FamilyProduct";
import {Product} from "./Product";
import {BranchOffice} from "./BranchOffice";

export class Stock {

  id: number;
  product: Product;
  quantity: number;
  quantityWarning: number;
  active: boolean;
  branchOffice: BranchOffice;

}
