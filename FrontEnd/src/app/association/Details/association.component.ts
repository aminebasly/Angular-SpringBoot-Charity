import { Component, TemplateRef } from '@angular/core';
import { Association } from '../../models/Association';
import { AssociationService } from '../../services/association.service';
import { NgIfContext } from '@angular/common';
import { AssociationDashboardDTO } from 'src/app/models/AssociationDashboardDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent {
  associations: Association[] = [];
  errorMessage: string = '';
  noData: TemplateRef<NgIfContext<boolean>> | null | undefined;
 

  // Propriétés pour le pop-up d'ajout
  isAddPopupVisible = false;
  newAssociation: Association = {
    associationId: 0,
    name: '',
    associationDescription: '',
    foundingDate: new Date(),
    
    users: [],
    cases: []
  };
  selectedFile: File | null = null; // Store the selected PDF file

  constructor(private associationService: AssociationService) { }

  ngOnInit(): void {
    this.loadAssociations();
    
  }

  loadAssociations(): void {
    this.associationService.getAllAssociations()
      .subscribe({
        next: (data: Association[]) => {
          this.associations = data;
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
  }

  
 
  

  // Other methods (editAssociation, deleteAssociation, loadDashboard) remain unchanged
  editAssociation(association: Association): void {
    const updatedAssociation: Association = { ...association };
    updatedAssociation.name = prompt('Nouveau nom pour l\'association :', association.name) || association.name;
    updatedAssociation.associationDescription = prompt('Nouvelle description :', association.associationDescription) || association.associationDescription;
    const newDate = prompt('Nouvelle date de fondation (format: YYYY-MM-DD) :', association.foundingDate.toString().substring(0, 10));
    updatedAssociation.foundingDate = newDate ? new Date(newDate) : association.foundingDate;
    ;

    this.associationService.updateAssociation(association.associationId, updatedAssociation)
      .subscribe({
        next: (updatedAssoc: Association) => {
          const index = this.associations.findIndex(a => a.associationId === updatedAssoc.associationId);
          if (index !== -1) {
            this.associations[index] = updatedAssoc;
          }
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la modification: ' + err.message;
          console.error('Erreur:', err);
        }
      });
  }

  deleteAssociation(associationId: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette association ?')) {
      this.associationService.deleteAssociation(associationId)
        .subscribe({
          next: () => {
            this.associations = this.associations.filter(assoc => assoc.associationId !== associationId);
            this.errorMessage = '';
            location.reload();
          },
          error: (err) => {
            this.errorMessage = 'Erreur lors de la suppression: ' + err.message;
            console.error('Erreur:', err);
          }
        });
    }
  }

  
}