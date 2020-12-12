import {User} from "./User";

export class JwtRequest {
  user: User;

  constructor() {
    this.user = new User();
  }
}
