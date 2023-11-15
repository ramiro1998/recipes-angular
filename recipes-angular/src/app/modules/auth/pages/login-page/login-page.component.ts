import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  formLogin: FormGroup = new FormGroup({});

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe(
      (responseOk) => {
        this.router.navigate(['/'])
        Swal.fire({
          title: "Good job!",
          text: "Ingreso exitoso!",
          icon: "success"
        });
        console.log(responseOk);
      },
      (error) => {
        Swal.fire({
          title: "Credenciales invalidas",
          text: "Te la mandaste!",
          icon: "error"
        });
        console.log(error);
      }
    );
  }

  goRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}

// {
//   "email":"userTest@test.com",
//   "password":"123456"
// }