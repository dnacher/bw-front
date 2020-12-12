import {UserType} from "./UserType";

export class User {
  email: string;
  password: string;
  userType: UserType=new UserType();
}
