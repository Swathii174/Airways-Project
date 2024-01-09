import { Component, OnInit } from '@angular/core';
import { BodyService } from '../body/body.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
@Component({
  selector: 'app-traveller-details',
  templateUrl: './traveller-details.component.html',
  styleUrls: ['./traveller-details.component.scss']
})
export class TravellerDetailsComponent implements OnInit {

  constructor(private bodyService: BodyService, private router: Router, private form: FormBuilder, private snackbar: MatSnackBar) { }

  flightName: any
  price: any
  time: any
  from: any
  to: any
  date: any

  travellerDetailsForm = this.form.group({
    name: [''],
    emailId: [''],
    address: [''],
    mobileNo: ['']
  })
  ngOnInit(): void {
    if (!this.bodyService.flightName) {
      this.router.navigate([''])
    }
    this.flightName = this.bodyService.flightName
    this.price = this.bodyService.price
    this.time = this.bodyService.time
    this.from = this.bodyService.from
    this.to = this.bodyService.to
    this.date = this.bodyService.date
  }
  confirm() {

    // console.log(this.from)
    // console.log(this.tooo)

    if (this.travellerDetailsForm.get('name')?.value && this.travellerDetailsForm.get('emailId')?.value && this.travellerDetailsForm.get('mobileNo')?.value && this.travellerDetailsForm.get('address')?.value) {
      this.bodyService.personalDetails(this.travellerDetailsForm.get('name')?.value, this.travellerDetailsForm.get('emailId')?.value, this.travellerDetailsForm.get('mobileNo')?.value, this.travellerDetailsForm.get('address')?.value,).subscribe(
        async (response: any) => {
          if (response.messageType == 'S') {
            this.snackbar.open(response.message, "Okay", { duration: 3000 });
            this.bodyService.name = this.travellerDetailsForm.get('name')?.value
            console.log(this.from, this.to, this.flightName, this.price, this.time)
            this.bodyService.sendEmail(this.travellerDetailsForm.get('name')?.value, this.travellerDetailsForm.get('emailId')?.value, this.bodyService.flightName, this.bodyService.from, this.bodyService.to, moment(this.bodyService.date).format('DD-MMM-YYYY'), this.bodyService.time).subscribe(
              async (res: any) => {

              }
            )
            this.router.navigate(['ticket']);
          }
          else {
            this.snackbar.open(response.message, "Okay", { duration: 3000 });
          }
        }
      )
    }
    else {
      this.snackbar.open("Fill All The Fields ", "Okay", { duration: 3000 });
    }
  }
  homePage() {
    this.router.navigate(['searchFlights']);
  }
}
