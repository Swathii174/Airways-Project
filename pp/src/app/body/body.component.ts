import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
// import { HttpClient } from '@angular/common/http';
import { BodyService } from './body.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  isDisabled = true
  trip: any;
  arr = [
    { name: "one-way", val: "1" }, { name: "round-trip", val: "2" }, { name: "multi-city", val: "3" }
  ]
  destination: any;
  constructor(private form: FormBuilder, public dialog: MatDialog, private bodyService: BodyService, private router: Router,) {
    // this.getDestinations()
  }

  from: any;
  too: any;
  travellers: any
  flights: any

  swathiForm = this.form.group({
    from: [''],
    to: [''],
    fromDate: [''],
    returnDate: [''],
    radioButton: [''],
  })

  async ngOnInit() {

    if (!localStorage.getItem('user')) {
      this.router.navigate([''])
    }
    this.swathiForm.get('radioButton')!.valueChanges.subscribe(changes => {
      if (changes == 2) {
        this.isDisabled = false
      }
      else
        this.isDisabled = true
    })


    await this.bodyService.getDestinations().subscribe(
      async (response: any) => {
        this.destination = response['data']
      }
    )

  }

  // getDestinations() {

  //   this.http.get("http://localhost:8085/getDestination")
  //     .subscribe((resultDate: any) => {
  //       console.log(resultDate.data);
  //       this.destination = resultDate.data;
  //     });


  // }

  dateChanged($event: any) {
    console.log($event.target.value);
  }

  fun() {
    console.log(this.trip);
  }
  // displayTicket() {
  //   const a = this.dialog.open(DialogBoxComponent, {
  //     height: '90%',
  //     width: '90%',
  //     data: {
  //       dataFromSwathiForm: this.swathiForm,
  //       test: "test"
  //     }
  //   })
  // }
  displayTicket() {
    this.from = this.swathiForm.get('from')?.value
    this.too = this.swathiForm.get("to")?.value

    // console.log(this.from)
    // console.log(this.too)

    this.bodyService.getFlights().subscribe(
      async (response: any) => {
        this.flights = response['data']
      }
    )
    this.bodyService.date = this.swathiForm.get("fromDate")?.value
  }

  async showDetails(i: any) {
    this.bodyService.from = i.from
    this.bodyService.to = i.to
    this.bodyService.flightName = i.fname
    this.bodyService.price = i.price
    this.bodyService.time = i.time

    this.router.navigate(['travellerDetails']);

  }
}
