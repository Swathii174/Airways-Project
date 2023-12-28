import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.from = this.data.dataFromSwathiForm.get("from").value
    this.too = this.data.dataFromSwathiForm.get("to").value


    this.http.get("http://localhost:8085/getFlights")
      .subscribe((resultDate: any) => {
        console.log(resultDate.data);
        this.flights = resultDate.data;
      });

  }

}
