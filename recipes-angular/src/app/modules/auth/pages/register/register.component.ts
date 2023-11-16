import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister: FormGroup = new FormGroup({});
  
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  sendRegister(): void {
    
    const { email, password } = this.formRegister.value;

    this.authService.newUser(email, password).subscribe(
      (responseOk) => {
        this.router.navigate(['/auth/login'])
        Swal.fire({
          title: "Good job!",
          text: "Puedes iniciar sesión!",
          icon: "success"
        });
        console.log(responseOk);
      },
      (error) => {
        Swal.fire({
          title: "Erro de conexión",
          text: "Intente más tarde",
          icon: "error"
        });
        console.log(error);
      }
    );
  }

  goLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
