import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Compound } from '../../Compound';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input() card: Compound;
  @Output() cardDelete: EventEmitter<Compound> = new EventEmitter();
}
