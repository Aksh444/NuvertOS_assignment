import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  if (token) return true;
  return router.createUrlTree(['/auth'], { queryParams: { redirect: state.url } });
};
