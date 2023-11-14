import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  toggleForm: boolean = true;

  constructor() { }

  registerView(): void {
    this.toggleForm = false;
  }
}
