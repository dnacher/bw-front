import {User} from "./User";
import {BranchOffice} from "./BranchOffice";

export class CartHeader{
  id: number;
  user: User;
  branchOffice: BranchOffice;
  date: Date;
  // status: Status;
  total: number;
  // coupon: Coupon;
  observation: string;
  // deliveryType: DeliveryType;
  scheduledOrder: boolean;
  timeSchedule: Date;
  delivery:User;

  constructor() {
    this.user = new User();
    this.delivery= new User();
    this.total=0;
  }

}
