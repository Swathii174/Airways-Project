import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BodyService {

  flightName: any
  price: any
  time: any
  from: any
  to: any
  name: any
  date: any
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
  createNewUser = (name: any, mobileNo: any, username: any, password: any) => {
    return this.http.post("http://localhost:8085/createNewUser", {
      name: name,
      mobileNo: mobileNo,
      username: username,
      password: password
    });
  }


  personalDetails = (name: any, emailId: any, mobileNo: any, address: any) => {
    return this.http.post("http://localhost:8085/personalDetails", {
      name: name,
      emailId: emailId,
      mobileNo: mobileNo,
      address: address
    });
  }

  sendEmail = (name: any, to: any, flightName: any, from: any, toLocation: any, date: any, time: any) => {
    return this.http.post("http://localhost:8085/send-email", {
      name: name,
      to: to,
      flightName: flightName,
      from: from,
      toLocation: toLocation,
      date: date,
      time: time
      // time: time,
      // date:date
    });
  }
}