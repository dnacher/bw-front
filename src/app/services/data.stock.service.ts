import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {Stock} from "../classes/Stock";

@Injectable({
  providedIn: 'root'
})

export class DataStockService {

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

  getStocks(): Observable<any> {
    return this.http.get(`${this.basePublicUrl}` + '/stocks/');
  }

  getStockById(id: any, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/stocks/' + `${id}`, this.setHeader(token));
  }

  saveStock(stock: Stock, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/stocks/', stock,this.setHeader(token));
  }

  updateStock(stock: Stock, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}`, stock, this.setHeader(token));
  }

  deleteStock(id: number, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + '/stocks/' + `${id}`, this.setHeader(token));
  }

}
