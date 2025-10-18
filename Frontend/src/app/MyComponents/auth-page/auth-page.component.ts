import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../MyServices/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  mode = signal<'login'|'register'>('login');
  email = ''; password = ''; confirm = '';
  show = false; loading = false; error = '';

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {
    const m = this.route.snapshot.queryParamMap.get('mode');
    if (m === 'register') this.mode.set('register');
  }

  get canSubmit() {
    const emailOk = /\S+@\S+\.\S+/.test(this.email);
    const passOk = this.password.length >= 6;
    const matchOk = this.mode() === 'login' ? true : this.password === this.confirm;
    return emailOk && passOk && matchOk && !this.loading;
  }

  switchMode() {
    const next = this.mode()==='login' ? 'register' : 'login';
    this.mode.set(next);
    this.router.navigate([], { queryParams: { mode: next }, queryParamsHandling: 'merge' });
  }

  submit() {
    this.error = ''; this.loading = true;
    const op = this.mode()==='login'
      ? this.auth.login(this.email, this.password)
      : this.auth.register(this.email, this.password);

    const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/';
    op.subscribe({
      next: () => { this.loading = false; this.router.navigateByUrl(redirect); },
      error: (e) => { this.loading = false; this.error = e?.error?.error || 'Failed'; }
    });
  }
}
