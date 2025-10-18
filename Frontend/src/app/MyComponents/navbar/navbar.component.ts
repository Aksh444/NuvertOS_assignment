import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../MyServices/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}
  get loggedIn() {return this.auth.isLoggedIn(); }
  logout() { this.auth.logout(); this.router.navigate(['/auth'], { queryParams: { mode: 'login'}}); }
}
