import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/authentication.service";

@Component({
  selector: 'sl-home',
  template: `
    <div class="ui container">
      <h1>Schön, dass du da bist!</h1>
      <a *ngIf= "!isLoggedIn()" class="is" routerLink="../login" class="ui blue basic button" >
        Anmelden  <i class="right arrow icon"></i>
      </a><br/><br/>
      <a *ngIf= "!isLoggedIn()" class="is" routerLink="/" class="ui red basic small button" >
        Registrieren
        <i class="right arrow icon"></i>
      </a>
      <a *ngIf= "isLoggedIn()" class="is" routerLink="../login" class="ui blue basic button">
        Abmelden
        <i class="right arrow icon"></i>
      </a>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService,
  ) {}

  ngOnInit(): void {
  }
  
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}

