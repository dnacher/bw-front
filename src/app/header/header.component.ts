import {Component, OnInit} from '@angular/core';
import {DataProductService} from "../services/data.product.service";
import {FamilyProduct} from "../classes/FamilyProduct";
import {AppComponent} from "../app.component";
import {CartLine} from "../classes/CartLine";
import swal from "sweetalert2";
import {JwtResponse} from "../classes/JwtResponse";
import {JwtRequest} from "../classes/JwtRequest";
import {DataUserService} from "../services/data.user.service";
import {Router} from "@angular/router";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public appComponent: AppComponent,
              public dataUserService: DataUserService,
              public router: Router,
              public homeComponent: HomeComponent) {
  }

  public jwtRequest: JwtRequest= new JwtRequest();
  public jwtResponse: JwtResponse = new JwtResponse();
  public searchText:string='';

  ngOnInit() {
    this.appComponent.checkCart();
  }

  deleteLine(line: CartLine) {
    swal.fire({
      title: 'Estas seguro?',
      text: "estas seguro que deseas borrar el producto " + line.product.name + "?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#00B0F0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire(
          'Borrado!',
          'El producto se borro de tu pedido',
          'success'
        )
        this.appComponent.processDeleteProduct(line);
        // this.appComponent.deleteCartLine(line);
        // this.appComponent.saveCartToLocalStorage(this.appComponent.cart);
      }
    })
  }

  public getFullName(){
    if(this.appComponent.jwtResponse){
      return this.appComponent.jwtResponse.user.email;
    }
  }

  public logout() {
    localStorage.setItem('jwtResponse',null);
    this.appComponent.jwtResponse = new JwtResponse();
  }

  async login() {
    const {value: formValues} = await swal.fire({
      html:
      '<div class="container login-container">' +
        '  <div class="row justify-content-center">' +
        '    <div class="col-md-10 login-form-2">' +
        '      <h3>Login</h3><br>' +
        '        <div class="form-group">' +
        '          <input id="txtEmail" type="text" class="form-control" placeholder="Email" (focus)="true"/>' +
        '        </div>' +
        '        <div class="form-group">' +
        '          <input id="txtPassword" type="password" class="form-control" placeholder="Password"/>' +
        '        </div>' +
        '        <br>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      focusConfirm: false,
      confirmButtonText: 'Login',
      showCloseButton:true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById("txtEmail")).value,
          (<HTMLInputElement>document.getElementById("txtPassword")).value
        ]
      }
    })
    if (formValues) {
      if(formValues[0].length>0 && formValues[1].length>0){
        this.jwtRequest.user.email = formValues[0];
        this.jwtRequest.user.password = formValues[1];
        this.checkLogin();
      }else{
        this.errorMessage('Debe completar todos los campos');
      }
    }
  }

  checkLogin() {
    this.dataUserService.login(this.jwtRequest).subscribe(
      data => {
        this.jwtResponse = data,
        localStorage.setItem('jwtResponse', JSON.stringify(this.jwtResponse));
        this.appComponent.jwtResponse = this.jwtResponse;
        this.router.navigate(['/']).then();
      },
      info => {
        this.errorMessage('Email o password incorrecto, por favor intentar nuevamente.');
      });
  }

  public errorMessage(message: string){
    swal.fire({
      icon: "error",
      title: 'Error de login',
      html: message,
      showCloseButton:true,
      timerProgressBar: true,
      didOpen: () => {
        swal.showLoading()
      }
    })
  }

}
