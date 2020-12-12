import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AppComponent} from "./app.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

// @Injectable()
// export class AuthTypeGuard implements CanActivate{
//   constructor(private router: Router, private state: RouterStateSnapshot,private app: AppComponent, private snack: MatSnackBar) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
//     if(this.app.jwtResponse && this.app.jwtResponse.user &&
//         route.data.type.includes(this.app.jwtResponse.user.userType.name)){
//       return true;
//     }else{
//       console.log("aqui en el else");
//       this.router.navigate(['/login']);
//       // this.snack.open('You do not have access to this page','Ok');
//     }
//   }
// }
