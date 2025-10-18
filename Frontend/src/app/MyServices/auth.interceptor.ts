import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = typeof window !== 'undefined' ? (localStorage.getItem('token') || '') : '';
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    tap({
      error: (err) => {
        if (err?.status === 401) {
          router.navigate(['/auth'], { queryParams: { mode: 'login', redirect: router.url } });
        }
      }
    })
  );
};
