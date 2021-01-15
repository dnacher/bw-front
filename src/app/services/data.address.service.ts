import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {Address} from "../classes/Address";

@Injectable({
  providedIn: 'root'
})

export class DataAddressService {

  private baseUrl = environment.baseUrl + '/addresses';

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

  getAddress(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`,this.setHeader(token));
  }

  getAddressById(id: any, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`, this.setHeader(token));
  }

  // saveAddress(address: Address, token: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}`, address,this.setHeader(token));
  // }

  saveAddress(address: Address): Observable<any> {
    return this.http.post(`${environment.baseUrl}` + '/addresses/',address);
  }

  updateAddress(address: Address, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}`, address, this.setHeader(token));
  }

  deleteAddress(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.setHeader(token));
  }

}
