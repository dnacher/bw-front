import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {Cart} from "../classes/Cart";

@Injectable({
  providedIn: 'root'
})

export class DataCartService {

  private baseUrl = environment.baseUrl + '/carts/';

  constructor(private http: HttpClient) {}

  setHeader(token: string): any{
    var header = {
      headers: new HttpHeaders().
      set('Authorization',  `Bearer ${token}`).
      append("Access-Control-Allow-Origin", "*").
      append("Access-Control-Allow-Credentials", "true").
      append("Access-Control-Allow-Methods","DELETE, GET,POST, PUT").
      append("Access-Control-Max-Age", "3600").
      append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization")

    }
    return header;
  }

  // getCart(token: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}`,this.setHeader(token));
  // }
  //
  // getCartByHeaderId(id: any, token: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}${id}`, this.setHeader(token));
  // }
  //
  // saveCart(cart: Cart, token: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}`, cart,this.setHeader(token));
  // }
  //
  // updateCart(cart: Cart, token: string): Observable<any> {
  //   return this.http.put(`${this.baseUrl}`, cart, this.setHeader(token));
  // }
  //
  // deleteCart(id: number, token: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/${id}`, this.setHeader(token));
  // }

  getCartByHeaderId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  saveCart(cart: Cart): Observable<any> {
    return this.http.post(`${this.baseUrl}`,cart);
  }

  updateCart(cart: Cart): Observable<any> {
    return this.http.put(`${this.baseUrl}`, cart);
  }

  deleteCart(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
