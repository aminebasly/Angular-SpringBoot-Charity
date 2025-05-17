
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/EventService';
import {Category, Event} from '../../../models/event';
import { ParticipationService } from 'src/app/services/ParticipationService';
import {AuthService} from "../../../services/auth.service";
import {GeminiService} from "../../../services/geminiService";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  events: Event[] = [];
    eventForm: FormGroup;
    errorMessage: string = '';
    isModalOpen: boolean = false;
    isEditMode: boolean = false;
    currentEventId: number | undefined | null = null;
    searchQuery: string = '';
    message: string = '';
    recommendedEvents: Event[] = [];
    showRecommended = false;
  isDetailModalOpen: boolean = false;
  selectedEvent: any = null;
  currentPage: number = 0;
  pageSize: number = 6; // 5 participations par page
  totalPages: number = 0; // nombre total de pages
  
    constructor(
        private eventService: EventService,
        private fb: FormBuilder,
        private participationService: ParticipationService,
        private authService: AuthService,
        private geminiService: GeminiService,
  
  
    ) {
      this.eventForm = this.fb.group({
        eventTitle: ['', Validators.required],
        eventDescription: ['', [Validators.required, Validators.minLength(20)]],
        eventDate: ['', [Validators.required, this.futureDateValidator]],
        category: ['', Validators.required],
        eventLocation: ['', Validators.required],
        places: ['', [Validators.required, Validators.min(1)]]
      });
    }
  
    ngOnInit(): void {
      this.loadEvents();
      this.eventForm.get('eventDescription')?.valueChanges.subscribe(() => this.autoPredictDate());
      this.eventForm.get('category')?.valueChanges.subscribe(() => this.autoPredictDate());
  
    }

  loadEvents(): void {
    this.eventService.getEventsPaginated(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.events = response.content; // Assuming Spring Boot pageable returns `content`
        this.totalPages = response.totalPages;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to load events: ' + err.message;
        console.error('Error fetching paginated events:', err);
      }
    });
  }
  
    createEvent(): void {
      if (this.eventForm.valid) {
        this.eventService.createEvent(this.eventForm.value).subscribe({
          next: (event) => {
            this.events.push(event);
            this.errorMessage = '';
            this.closeModal();
          },
          error: (err) => {
            this.errorMessage = 'Failed to create event: ' + (err.message || 'Unknown error');
            console.error('Error creating event:', err);
          }
        });
      } else {
        this.eventForm.markAllAsTouched();
        this.errorMessage = 'Please fill all required fields correctly.';
      }
    }
  
    updateEvent(): void {
      if (this.eventForm.valid && this.currentEventId !== null && this.currentEventId !== undefined) {
        this.eventService.updateEvent(this.currentEventId, this.eventForm.value).subscribe({
          next: (updatedEvent) => {
            const index = this.events.findIndex(event => event.eventId === this.currentEventId);
            if (index !== -1) {
              this.events[index] = updatedEvent;
            }
            this.eventForm.reset();
            this.errorMessage = '';
            this.closeModal();
          },
          error: (err) => {
            this.errorMessage = 'Failed to update event: ' + (err.message || 'Unknown error');
            console.error('Error updating event:', err);
          }
        });
      } else {
        this.eventForm.markAllAsTouched();
        this.errorMessage = 'Please fill all required fields correctly.';
      }
    }
  
    deleteEvent(id: number): void {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.events = this.events.filter(e => e.eventId !== id);
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete event: ' + err.message;
          console.error('Error deleting event:', err);
        }
      });
    }
  
    openModal(event?: Event): void {
      this.isModalOpen = true;
      this.errorMessage = '';
      if (event) {
        this.isEditMode = true;
        this.currentEventId = event.eventId;
        this.eventForm.patchValue(event);
      } else {
        this.isEditMode = false;
        this.currentEventId = null;
        this.eventForm.reset();
      }
    }
  
    closeModal(): void {
      this.isModalOpen = false;
      this.eventForm.reset();
      this.errorMessage = '';
    }
  
    futureDateValidator(control: any): { [key: string]: boolean } | null {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      if (selectedDate <= currentDate) {
        return { futureDate: true };
      }
      return null;
    }
  
    searchEvents(): void {
      if (this.searchQuery.trim()) {
        this.eventService.advancedSearchEvents(this.searchQuery).subscribe({
          next: (data) => {
            this.events = data;
            this.errorMessage = '';
          },
          error: (err) => {
            this.errorMessage = 'Failed to search events: ' + err.message;
            console.error('Error searching events:', err);
          }
        });
      } else {
        this.loadEvents(); // Reload all events if search is empty
      }
    }
    addParticipation(eventTitle: string): void {
      console.log('Event Title:', eventTitle); // Debugging line
      const username = this.authService.getUsernameFromToken();
      if (username) {
        this.participationService.addParticipation(eventTitle, username).subscribe({
          next: () => {
            this.message = `Successfully joined event: ${eventTitle}`;
            this.loadEvents(); // Refresh the event list
          },
          error: (error) => {
            this.message = error.message || 'Failed to join event.';
          }
        });
      } else {
        alert('User is not authenticated.');
      }
    }
    loadRecommendedEvents(): void {
      const username = this.authService.getUsernameFromToken();
  
      if (!username) {
        this.errorMessage = 'User not authenticated.';
        return;
      }
  
      this.eventService.getRecommendedEvents(username).subscribe({
        next: (data) => {
          this.recommendedEvents = data;
          this.events = data; // Override current list with recommended events
          this.showRecommended = true;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to load recommended events';
          console.error(err);
        }
      });
    }
    async autoPredictDate(): Promise<void> {
      const category = this.eventForm.get('category')?.value;
      const description = this.eventForm.get('eventDescription')?.value;
  
      if (category && description && description.length >= 20) {
        const predictedDate = await this.geminiService.predictEventDate(category, description);
        if (predictedDate) {
          this.eventForm.get('eventDate')?.setValue(predictedDate);
        }
      }
    }
  openDetailModal(event: any) {
    this.selectedEvent = event;
    this.isDetailModalOpen = true;
  }

  closeDetailModal() {
    this.isDetailModalOpen = false;
    this.selectedEvent = null;
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadEvents();
    }
  }
  

}
