import {User} from "./User";

export class JwtResponse {
  token: string;
  expirationDate: Date;
  user: User;
}
