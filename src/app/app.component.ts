import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'ClinicaOnline';

  constructor(public auth : AuthService){

  }

  handleLogOut(){
    this.auth.SignOut();
  }
  
}
