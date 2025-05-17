import { Component } from '@angular/core';
import { DonService } from '../serviceDon/don.service';
import { don } from '../serviceDon/don';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-don',
  templateUrl: './ajout-don.component.html',
  styleUrls: ['./ajout-don.component.scss']
})
export class AjoutDonComponent {
  donation: any = {  
    donTitle: '',
    donDescription: '',
    donDate: '',
    donType: '',
    image: null  // ✅ ADD IMAGE PROPERTY TO STORE THE FILE
  };

  donationForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private donationService: DonService, private fb: FormBuilder) {
    this.donationForm = this.fb.group({
      donTitle: [''],
      donDescription: [''],
      donDate: [''],
      donType: [''],
      file: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.donation.file = file; // ✅ STORE FILE UNDER "file"
  
      // IMAGE PREVIEW
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
  
      reader.readAsDataURL(file);
      console.log('Selected file:', file);
    } else {
      this.selectedFile = null;
      this.donation.file = null;
      this.imagePreview = null;
    }
  }


  submitDonation() {
    const formData = new FormData();
    formData.append('donTitle', this.donation.donTitle);
    formData.append('donDescription', this.donation.donDescription);
    formData.append('donDate', this.donation.donDate);
    formData.append('donType', this.donation.donType);

    if (this.donation.file) {
      formData.append('file', this.donation.file);
    }

    this.donationService.AjoutDon(formData).subscribe(
        (response) => {
          console.log('Donation added successfully:', response);

          if (response.potentialFraud) {
            // ⚠️ FRAUD WARNING
            Swal.fire({
              icon: 'warning',
              title: 'Suspicious Donation Detected',
              text: response.fraudReason || 'Please verify the donation details.',
              confirmButtonColor: '#ffc107'
            });
          } else {
            // ✅ NORMAL SUCCESS
            Swal.fire({
              icon: 'success',
              title: 'Donation Added!',
              text: 'Your donation has been successfully submitted.',
              confirmButtonColor: '#28a745'
            });
          }

          // RESET FORM
          this.donation = {};
        },
        (error) => {
          console.error('Error adding donation:', error);

          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong while adding the donation. Try again!',
            confirmButtonColor: '#dc3545'
          });
        }
    );
  }


}