import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {Sucursal} from "../classes/Sucursal";

@Injectable({
  providedIn: 'root'
})

export class DataSucursalesService {

  private baseUrl = environment.privateBaseUrl + '/branch_offices/';

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

  getSucursales(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}`,this.setHeader(token));
  }

  getSucursalById(id: any, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`, this.setHeader(token));
  }

  saveSucursal(sucursal: Sucursal, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, sucursal,this.setHeader(token));
  }

  updateSucursal(sucursal: Sucursal, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}`, sucursal, this.setHeader(token));
  }

  deleteSucursal(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.setHeader(token));
  }

}
