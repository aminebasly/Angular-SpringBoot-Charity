import { Component, OnInit } from '@angular/core';
import { RefugeeSupportControllerService } from '../../services/servicess/refugee-support-controller.service';
import { RefugeeSupport } from '../../services/models/refugee-support';
import { User } from '../../services/models/user';
@Component({
  selector: 'app-refugee-support-list',
  templateUrl: './refugee-support-list.component.html',
  styleUrls: ['./refugee-support-list.component.css']
})
export class RefugeeSupportListComponent implements OnInit {
  refugeeSupports: RefugeeSupport[] = [];

  newRefugeeSupport: RefugeeSupport = {
    helpRequest: '',
    question: "Do you need any help?",
    shelterRequest: '',
    reqStatus: 'PENDING',
   
    services: []
  };

  constructor(private refugeeSupportService: RefugeeSupportControllerService) {}

  ngOnInit(): void {
    console.log("RefugeeSupportListComponent chargé !");
    this.loadRefugeeSupports();
  }

  onStatusChange(value: 'PENDING' | 'ANSWERED') {
    this.newRefugeeSupport.reqStatus = value;
  }

  loadRefugeeSupports(): void {
    this.refugeeSupportService.getAllRefugeeSupports().subscribe({
      next: (data) => {
        console.log('Données reçues de l\'API:', data);
        if (data && Array.isArray(data)) {
          this.refugeeSupports = data;
        } else {
          console.error('Format de données incorrect', data);
          this.refugeeSupports = [];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des supports', err);
        this.refugeeSupports = [];
      }
    });
  }

  addRefugeeSupport(): void {
    this.refugeeSupportService.createRefugeeSupport({ body: this.newRefugeeSupport }).subscribe({
      next: () => {
        this.loadRefugeeSupports();
        this.resetForm();
      },
      error: (err) => console.error('Erreur lors de l\'ajout du support', err)
    });
  }

  updateRefugeeSupportStatus(supportId: number, status: "PENDING" | "ANSWERED"): void {
    const supportToUpdate = this.refugeeSupports.find(s => s.supportId === supportId);
    
    if (!supportToUpdate) {
      console.error("Impossible de trouver le support avec ID :", supportId);
      return;
    }
  
    const updatedSupport: RefugeeSupport = {
      ...supportToUpdate,
      reqStatus: status
    };
  
    this.refugeeSupportService.updateRefugeeSupport({ id: supportId, body: updatedSupport }).subscribe({
      next: () => {
        console.log(`Statut de ${supportId} mis à jour en ${status}`);
        this.loadRefugeeSupports();
      },
      error: (err) => console.error('Erreur lors de la mise à jour du statut', err)
    });
  }

  deleteRefugeeSupport(supportId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.refugeeSupportService.deleteRefugeeSupport({ id:supportId }).subscribe({
        next: () => this.loadRefugeeSupports(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  resetForm(): void {
    this.newRefugeeSupport = {
      helpRequest: '',
      question: '',
      shelterRequest: '',
      reqStatus: 'PENDING',
      services: []
    };
  }
}
