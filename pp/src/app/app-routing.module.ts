import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {
    path: '', component: LoginpageComponent
  },
  {
    path: 'searchFlights', component: BodyComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
