import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/authservice';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAccessToken();
  if (token) {
    return true; // utilisateur connecté, accès autorisé
  } else {
    router.navigate(['/login']); // redirige vers login
    return false;
  }
};
