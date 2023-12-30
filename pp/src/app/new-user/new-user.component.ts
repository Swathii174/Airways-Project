import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyService } from '../body/body.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  hide = true;
  newUserForm = this.form.group({
    username: [''],
    password: [''],
    name: [''],
    mobileNo: ['']
  })

  constructor(private form: FormBuilder, private bodyService: BodyService, private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }
  createAccount() {
    if (this.newUserForm.get('name')?.value && this.newUserForm.get('mobileNo')?.value && this.newUserForm.get('username')?.value && this.newUserForm.get('password')?.value) {
      this.bodyService.createNewUser(this.newUserForm.get('name')?.value, this.newUserForm.get('mobileNo')?.value, this.newUserForm.get('username')?.value, this.newUserForm.get('password')?.value,).subscribe(
        async (response: any) => {
          if (response.messageType == 'S') {
            this.router.navigate(['']);
            this.snackbar.open(response.message, "Okay", { duration: 3000 });
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
}
