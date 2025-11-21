import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.estaLogueado()) {
    router.navigate(['/login']);
    return false;
  }

  const rolRequerido = route.data['role'];
  
  if (rolRequerido && authService.getRol() !== rolRequerido) {
    alert('No tienes permisos para ver esta página.');
    router.navigate(['/']);
    return false;
  }

  return true;
};