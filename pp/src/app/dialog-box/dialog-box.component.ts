import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BodyService } from '../body/body.service'
export interface DialogData {
  dataFromSwathiForm: any;
  text: any;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  from: any;
  too: any;
  travellers: any
  flights: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private bodyService: BodyService
  ) { }

  async ngOnInit() {

    this.from = this.data.dataFromSwathiForm.get("from").value
    this.too = this.data.dataFromSwathiForm.get("to").value

    await this.bodyService.getFlights().subscribe(
      async (response: any) => {
        this.flights = response['data']
      }
    )

  }

}
