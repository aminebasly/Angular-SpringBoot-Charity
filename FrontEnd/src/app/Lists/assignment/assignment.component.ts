import { Component, Inject } from '@angular/core';
import { AssociationService } from '../../services/association.service';


@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {
  // Variables pour la section "Assign a Case"
  caseTitle: string = '';
  associationNameCase: string = '';
  caseMessage: string = '';

  // Variables pour la section "Assign a Member"
  username: string = '';
  associationNameMember: string = '';
  memberMessage: string = '';

  constructor(private associationService: AssociationService) {}

  assignCase(): void {
    this.associationService.assignCaseToAssociation(this.caseTitle, this.associationNameCase)
      .subscribe({
        next: (response) => {
          
          console.log('Success response:', response); // Vérifiez ici
          this.caseMessage = response;
          this.caseTitle = '';
          this.associationNameCase = '';
        },
        error: (error) => {
          this.caseMessage = `Error: ${error.message}`;
        }
      });
  }

  assignMember(): void {
    this.associationService.assignMemberToAssociation(this.username, this.associationNameMember)
      .subscribe({
        next: (response) => {
          this.memberMessage = response;
          this.username = '';
          this.associationNameMember = '';
        },
        error: (error) => {
          this.memberMessage = `Error: ${error.message}`;
        }
      });
  }
}