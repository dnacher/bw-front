import {Company} from "./Company";

export class Address {
  name: string;
  description: string;
  company: Company;
  address: Address;
  score: number;
  openingHour: number;
  openingMinute: number;
  closeHour: number;
  closeMinute: number;
  isOpen: boolean;
}
