import {Company} from "./Company";
import {Address} from "./Address";

export class BranchOffice {

  id: number;
  name: string;
  description: string;
  company: Company;
  address: Address;
  score: number;
  opening_hour: number;
  opening_minute: number;
  close_hour: number;
  close_minute: number;
  isOpen: boolean;

}
