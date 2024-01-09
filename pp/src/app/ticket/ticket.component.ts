import { Component, OnInit } from '@angular/core';
import { BodyService } from '../body/body.service'
import { Router } from '@angular/router'
import * as moment from 'moment';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private bodyService: BodyService, private router: Router) { }

  flightName: any
  price: any
  time: any
  from: any
  to: any
  name: any
  date: any

  ngOnInit(): void {
    if (!this.bodyService.flightName) {
      this.router.navigate([''])
    }

    this.flightName = this.bodyService.flightName
    this.price = this.bodyService.price
    this.time = this.bodyService.time
    this.from = this.bodyService.from
    this.to = this.bodyService.to
    this.name = this.bodyService.name
    this.date = moment(this.bodyService.date).format('DD-MMM-YYYY')
  }


}
