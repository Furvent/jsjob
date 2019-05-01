import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import * as jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  BASE_URL = "http://localhost:4201/authentification";

  constructor(private httpClient: HttpClient) { }

  login(credentials) {
    console.log("bob");
    return this.httpClient.post(`${this.BASE_URL}/login`, credentials)
                          .pipe(map(response => response));
  }

  userIsLoggedIn() {
    return !!localStorage.getItem('jbb-data') //!! = un cast en booléean
  }

  logOut() {
    localStorage.removeItem('jbb-data');
  }

  register(credentials) {
    return this.httpClient.post(`${this.BASE_URL}/register`, credentials)
                          .pipe(map(response => response));
  }

  decodeToken(token){
    return jwtDecode(token);
  }
}
