import { Component } from '@angular/core';
import { DonService } from '../serviceDon/don.service';

@Component({
  selector: 'app-update-don',
  templateUrl: './update-don.component.html',
  styleUrls: ['./update-don.component.css']
})
export class UpdateDonComponent {
  donationId: number = 1; // Remplace par l'ID réel du don
  updatedDon = {
    donTitle: '',
    donDescription: '',
    donDate: '',
    donType: ''
  };

  constructor(private donService: DonService) {}

  updateDonation() {
    this.donService.updateDonation(this.donationId, this.updatedDon).subscribe(() => {
      alert("Don mis à jour avec succès !");
    }, error => {
      alert("Erreur lors de la mise à jour !");
    });
  }
}
