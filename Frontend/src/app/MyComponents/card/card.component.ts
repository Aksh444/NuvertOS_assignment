import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Compound } from '../../Compound';
import { CardItemComponent } from '../card-item/card-item.component';
import { CompoundsDataService } from '../../MyServices/compounds-data.service';
import { Route404Component } from '../404/404.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    CardItemComponent,
    Route404Component,
    NavbarComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  cards: Compound[];
  currentPage: number = 1;
  totalPages: number = 3;

  constructor(private compoundsData: CompoundsDataService) {
    this.loadCompounds(this.currentPage);
  }

  loadCompounds(page: number) {
    this.compoundsData.compounds(page).subscribe({
      next: (data) => {
        this.cards = data.compounds;
      },
      error: (err) => {
        console.error('Error fetching compounds:', err);
      },
    });
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCompounds(this.currentPage++);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCompounds(this.currentPage);
    }
  }
}
