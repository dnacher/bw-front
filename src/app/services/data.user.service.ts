import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from 'rxjs';
import {JwtRequest} from "../classes/JwtRequest";
import {environment} from "../../environments/environment";
import {User} from "../classes/User";

@Injectable({
  providedIn: 'root'
})

export class DataUserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {   }

  login(jwtRequest: JwtRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}` + `/login`,jwtRequest);
    }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}` + `/register`,user);
  }



}
