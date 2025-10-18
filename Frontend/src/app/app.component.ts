import { Component } from '@angular/core';
import { CardComponent } from './MyComponents/card/card.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    RouterOutlet,
    HttpClientModule,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Chemistry';
}
