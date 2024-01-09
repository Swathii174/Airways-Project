import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyService } from '../body/body.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  hide = true;
  loginForm = this.form.group({
    username: [''],
    password: ['']
  })
  is_user_valid: any
  constructor(private form: FormBuilder, private bodyService: BodyService, private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async login() {
    console.log(this.loginForm.get('username')?.value)

    this.bodyService.checkUser(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(
      async (response: any) => {
        if (response.messageType == 'S') {
          localStorage.setItem('user', this.loginForm.get('username')?.value);
          this.router.navigate(['searchFlights']);
        }
        else {
          this.snackbar.open("Sorry ! Create an account ", "Okay", { duration: 3000 });
        }
      }
    )

  }

}
