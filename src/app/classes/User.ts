import {UserType} from "./UserType";

export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserType=new UserType();

  constructor() {
    this.firstName= "";
    this.lastName="";
    this.email="";
    this.password="";
  }

  public getfullName(){
    return this.firstName + ' ' + this.lastName;
  }
}
