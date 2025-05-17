import { Component } from '@angular/core';
import { TestimonialService } from '../../services/testimonial.service';
import { Association } from '../../models/Association';
import { AssociationService } from '../../services/association.service';
import { Testimonial } from '../../models/Testimonial';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssociationDashboardDTO } from 'src/app/models/AssociationDashboardDTO';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-home-front',
  templateUrl: './home-front.component.html',
  styleUrls: ['./home-front.component.css']
})
export class HomeFrontComponent  {
  positiveTestimonials: Testimonial[] = [];
  testimonialForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isListening: boolean = false;
  recognition: any;
  associations: Association[] = [];
  
    
    
    dashboard: AssociationDashboardDTO | null = null;
  
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private testimonialService: TestimonialService,
    private associationService: AssociationService
  ) {
    this.testimonialForm = this.fb.group({
      testimonialTitle: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ],
      datePost: [
        new Date(),
        [
          Validators.required,
          this.pastOrPresentValidator()
        ]
      ]
    });

    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US'; // or 'fr-FR' if your site is in French

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const current = this.testimonialForm.get('content')?.value || '';
        const updated = (current + ' ' + transcript).trim();
        this.testimonialForm.patchValue({ content: updated });
      };
      

      this.recognition.onend = () => {
        this.isListening = false;
      };
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  }

  ngOnInit(): void {
    this.loadPositiveTestimonials();
  }
  loadPositiveTestimonials(): void {
    this.testimonialService.getAllTestimonials().subscribe({
      next: (data) => {
        console.log('Loaded testimonials:', data);
        this.positiveTestimonials = data
          .filter(testimonial => testimonial.sentiment === 'positive')
          .map(testimonial => ({
            ...testimonial,
            datePost: new Date(testimonial.datePost) // Ensure datePost is a Date
          }));
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Error loading testimonials: ' + err.message;
        this.positiveTestimonials = [];
      }
    });
  }

  // Start voice recognition
  startListening(): void {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  // Stop voice recognition
  stopListening(): void {
    if (this.recognition) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  pastOrPresentValidator() {
    return (control: any) => {
      const inputDate = new Date(control.value);
      const today = new Date();
      return inputDate <= today ? null : { futureDate: true };
    };
  }

  submitTestimonial(): void {
    if (this.testimonialForm.valid) {
      const testimonial: Testimonial = this.testimonialForm.value;
      this.testimonialService.createTestimonial(testimonial).subscribe({
        next: (response) => {
          this.successMessage = 'Testimonial submitted successfully!';
          this.errorMessage = '';
          this.testimonialForm.reset({ datePost: new Date() });
        },
        error: (err) => {
          this.errorMessage = 'Error submitting testimonial: ' + err.message;
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  hasError(field: string, error: string): boolean {
    const control = this.testimonialForm.get(field);
    return control?.hasError(error) && (control?.dirty || control?.touched) || false;
  }

   onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        // Optional: Validate file type
        if (this.selectedFile.type !== 'application/pdf') {
          Swal.fire({
            icon: 'error',
            title: 'Invalid File',
            text: 'Please upload a PDF file.',
            confirmButtonText: 'OK'
          });
          this.selectedFile = null;
          input.value = ''; // Reset input
        }
      }
    }
  
    // Méthode pour ouvrir le pop-up
    openAddPopup(): void {
      this.isAddPopupVisible = true;
    }
  
    // Méthode pour fermer le pop-up
    closeAddPopup(): void {
      this.isAddPopupVisible = false;
      this.resetNewAssociation();
    }
  
    // Réinitialiser le formulaire
    private resetNewAssociation(): void {
      this.newAssociation = {
        associationId: 0,
        name: '',
        associationDescription: '',
        foundingDate: new Date(),
        
        users: [],
        cases: []
      };
      this.selectedFile = null; // Reset selected file
    }
  
    // Méthode pour ajouter une association avec vérification du document
    addAssociation(): void {
      if (!this.selectedFile) {
        Swal.fire({
          icon: 'error',
          title: 'Missing File',
          text: 'Please upload a PDF document for verification.',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      const formattedDate = this.formatDate(this.newAssociation.foundingDate);
  
      // Step 1: Verify the document
      this.associationService.verifyDocument(this.selectedFile, this.newAssociation.name, formattedDate)
        .subscribe({
          next: (result: string) => {
            if (result.toLowerCase().includes('validé')) {
              // Document is valid, proceed to create association
              const formattedAssociation = {
                ...this.newAssociation,
                foundingDate: new Date(formattedDate),
                // Marque explicitement l'association comme validée
              };
            
  
              this.associationService.createAssociation(formattedAssociation)
                .subscribe({
                  next: (addedAssoc: Association) => {
                    this.associations.push(addedAssoc);
                    this.closeAddPopup();
                    this.errorMessage = '';
                    Swal.fire({
                      icon: 'success',
                      title: 'Succès',
                      text: `Association "${addedAssoc.name}" ajoutée avec succès !`,
                      confirmButtonText: 'OK'
                    });
                  },
                  error: (err) => {
                    let errorMessage = 'Une erreur est survenue lors de l\'ajout.';
                    if (err.status === 500 && err.error?.message?.includes('uk_association_name')) {
                      errorMessage = 'Association name used';
                    } else if (err.error?.message) {
                      errorMessage = err.error.message;
                    }
    
                    Swal.fire({
                      icon: 'error',
                      title: 'Erreur',
                      text: errorMessage,
                      confirmButtonText: 'OK'
                    });
                    console.error('Erreur:', err);
                  }
                });
            } else {
              // Document verification failed
              Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: 'The uploaded document does not match the provided details.',
                confirmButtonText: 'OK'
              });
            }
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: err.message || 'Une erreur est survenue lors de la vérification du document.',
              confirmButtonText: 'OK'
            });
            console.error('Erreur:', err);
          }
        });
    }
  
    // Méthode pour formater la date
    private formatDate(date: Date): string {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);  // Corrects month
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;  // Ensures format yyyy-MM-dd
    }
    getRandomUserPic(): string {
      const pics = [
        'assets/avatar.png',
        'assets/woman.png',
        'assets/selfie.png',
        'assets/female.png'
      ];
      const randomIndex = Math.floor(Math.random() * pics.length);
      return pics[randomIndex];
    }
    
    

  
}
