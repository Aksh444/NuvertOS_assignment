import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CompoundDataService } from '../../MyServices/compound-data.service';
import { UpdateCompoundService } from '../../MyServices/update-compound.service';
import { FormsModule } from '@angular/forms';
import { Compound } from '../../Compound';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css'],
})
export class CardDetailComponent {
  compound: Compound;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private compoundDataById: CompoundDataService,
    private updateCompoundService: UpdateCompoundService
  ) {}

  ngOnInit(): void {
    const cid = this.route.snapshot.params['cid'];
    this.getCompoundDetail(parseInt(cid, 10));
  }

  getCompoundDetail(cid: number): void {
    this.compoundDataById.CompoundById(cid).subscribe({
      next: (data: Compound) => {
        this.compound = data;
        console.log(this.compound);
      },
      error: (err) => {
        console.error('Error fetching compound data', err);
      },
    });
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.updateCompound();
    }
    this.isEditing = !this.isEditing;
  }

  updateCompound(): void {
    if (!this.compound) return; // Ensure compound exists

    const updatedCompound: Compound = {
      ...this.compound,
    };

    console.log(updatedCompound);

    this.updateCompoundService.updateCompound(this.compound).subscribe({
      next: () => {
        console.log('Compound updated successfully');
        this.getCompoundDetail(this.compound.id); // Refresh the details
      },
      error: (err) => {
        console.error('Error updating compound:', err);
      },
    });
  }
}
