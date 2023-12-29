import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  constructor(private http: HttpClient) { }


  getDestinations = () => {
    return this.http.post("http://localhost:8085/getDestination", {});
  }

  getFlights = () => {
    return this.http.post("http://localhost:8085/getFlights", {});
  }

  checkUser = (username: any, password: any) => {
    return this.http.post("http://localhost:8085/checkUser", {
      username: username,
      password: password
    });
  }
}
