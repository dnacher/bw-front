import {FamilyProduct} from "./FamilyProduct";

export class Product {

  id: number;
  name: string;
  description: string;
  price: number;
  familyProduct: FamilyProduct;
  quantityWarning: number;
  active: boolean;
  imageUrl: string;
}
