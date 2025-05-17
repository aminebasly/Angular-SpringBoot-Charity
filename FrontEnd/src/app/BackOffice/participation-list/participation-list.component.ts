import { Component, OnInit } from '@angular/core';
import { ParticipationService } from 'src/app/services/ParticipationService';
import { Participation } from '../../models/participation';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent implements OnInit {
  participations: Participation[] = [];
  selectedParticipation: Participation | null = null;
  editMode = false;
  participationForm: FormGroup;
  searchQuery: string = ''; // New property for search input
  errorMessage: string = '';
  participationStats: any[] = [];
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartReady: boolean = false;
  totalParticipations: number = 0;
  currentPage: number = 0;
  pageSize: number = 5; // 5 participations par page
  totalPages: number = 0; // nombre total de pages

  constructor(private participationService: ParticipationService, private fb: FormBuilder ) {
    this.participationForm = this.fb.group({
        participantId: ['', Validators.required],
        eventId: ['', Validators.required],
        participationDate: ['', Validators.required],
        participationStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadParticipations();
    this.loadParticipationStats();

  }

  loadParticipations(): void {
    this.participationService.getAllParticipations(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.participations = response.content; // si ton backend renvoie un objet Page
        this.totalPages = response.totalPages;
      },
      error: (err) => console.error('Error fetching participations:', err)
    });
  }


  editParticipation(participation: Participation): void {
    this.selectedParticipation = { ...participation }; // Clone to avoid direct mutation
    this.editMode = true;
  }

  updateParticipation(): void {
    if (this.selectedParticipation) {
      this.participationService.updateParticipation(this.selectedParticipation.participantId, this.selectedParticipation)
          .subscribe({
            next: () => {
              this.loadParticipations();
              this.cancelEdit();
            },
            error: (err) => console.error('Error updating participation:', err)
          });
    }
  }

  deleteParticipation(id: number): void {
    if (confirm('Are you sure you want to delete this participation?')) {
      this.participationService.deleteParticipation(id).subscribe({
        next: () => this.loadParticipations(),
        error: (err) => console.error('Error deleting participation:', err)
      });
    }
  }

  cancelEdit(): void {
    this.selectedParticipation = null;
    this.editMode = false;
  }
  isPhoneNumberValid(): boolean {
    return /^\d{8}$/.test(this.selectedParticipation?.phoneNum || '');
  }
  searchParticipations(): void {
    if (this.searchQuery.trim()) {
      this.participationService.advancedSearchParticipations(this.searchQuery).subscribe({
        next: (data) => {
          this.participations = data;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to search participations: ' + err.message;
          console.error('Error searching participations:', err);
        }
      });
    } else {
      this.loadParticipations(); // Reload all participations if search is empty
    }
  }
  loadParticipationStats() {
    this.participationService.getParticipationStatsByEventType()
        .subscribe(
            data => {
              this.participationStats = data;
              console.log('Participation stats by event type:', this.participationStats);

              // ADD THIS PART:
              this.pieChartLabels = this.participationStats.map(stat => stat.eventType);
              this.pieChartData = this.participationStats.map(stat => stat.count);
              this.pieChartReady = true;
            },
            error => {
              console.error('Error fetching participation stats', error);
            }
        );
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadParticipations();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadParticipations();
    }
  }


}