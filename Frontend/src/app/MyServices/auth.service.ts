import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api/auth';
  private key = 'token';

  constructor(private http: HttpClient) {}

  get token() {
    if (typeof window === 'undefined') return '';
    try { return localStorage.getItem(this.key) || ''; } catch { return ''; }
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.api}/login`, { email, password })
      .pipe(tap(res => { if (typeof window !== 'undefined') localStorage.setItem(this.key, res.token); }));
  }

  register(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.api}/register`, { email, password })
      .pipe(tap(res => { if (typeof window !== 'undefined') localStorage.setItem(this.key, res.token); }));
  }

  logout() { if (typeof window !== 'undefined') localStorage.removeItem(this.key); }
  isLoggedIn() { return !!this.token; }
}
