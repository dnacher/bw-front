import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {Sucursal} from "../classes/Sucursal";
import {Product} from "../classes/Product";

@Injectable({
  providedIn: 'root'
})

export class DataProductService {

  private baseUrl = environment.privateBaseUrl ;
  private basePublicUrl = environment.baseUrl;

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

  getProducts(): Observable<any> {
    return this.http.get(`${this.basePublicUrl}` + '/products/');
  }

  getFamilyProducts(): Observable<any> {
    return this.http.get(`${this.basePublicUrl}` + '/family_products/');
  }

  getProductById(id: any, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/products/' + `${id}`, this.setHeader(token));
  }

  saveProduct(product: Product, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/products/', product,this.setHeader(token));
  }

  updateProduct(product: Product, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}`, product, this.setHeader(token));
  }

  deleteProduct(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + '/products/' + `${id}`, this.setHeader(token));
  }

}
