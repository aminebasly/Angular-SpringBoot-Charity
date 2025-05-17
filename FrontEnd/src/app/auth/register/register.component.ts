import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust the path as necessary
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {noAdminValidator} from "../../../main";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required, noAdminValidator()]],
      birthDate: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
          (response: any) => {
            this.successMessage = 'Registration successful! Redirecting...';
            this.errorMessage = null; // Clear error message
            setTimeout(() => {
              this.router.navigate(['/login']); // Redirect to login page after registration
            }, 1500);
          },
      );
    }
  }

}