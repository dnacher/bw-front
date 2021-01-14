import {User} from "./User";

export class Address {
  id: number;
  alias: string;
  street: string;
  number: number;
  street2: string;
  block: string;
  apartment: string;
  //falta barrio.
  phoneNumber: string;
  user: User;

  constructor() {
  }

}
