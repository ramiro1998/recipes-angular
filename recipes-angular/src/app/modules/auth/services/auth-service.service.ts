import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly URL = environment.api;
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  sendCredentials(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post(`${this.URL}/api/auth/login`, body);
  }

  newUser(email: string, password: string): Observable<any> {
    const body = { email, password };

    return this.http.post(`${this.URL}/api/auth/signup`, body);
  }

  logout() {
    this.cookieService.deleteAll('/')
    this.router.navigate(['/auth/login']);
  }
}
