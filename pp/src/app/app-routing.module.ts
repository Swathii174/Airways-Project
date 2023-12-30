import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { BodyComponent } from './body/body.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {
    path: '', component: LoginpageComponent
  },
  {
    path: 'searchFlights', component: BodyComponent
  },
  {
    path: 'newUser', component: NewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
