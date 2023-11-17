import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard = (): boolean => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  try {
    const token: boolean = cookieService.check('recipesToken');
    if (!token) {
      router.navigate(['/auth/login']);
    }
    
    return token;
  } catch (e) {
    return false;
  }
};