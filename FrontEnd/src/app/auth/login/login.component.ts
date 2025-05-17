import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { noAdminValidator } from '../../../main';
import { jwtDecode } from 'jwt-decode';


@Component({
    selector: 'app-auth',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class AuthComponent {
    authMode: 'login' | 'register' = 'login';
    loginForm: FormGroup;
    registerForm: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    loading = false;
    activationPopup = false;
    activationLoading = false;
    activationSuccess = false;
    activationToken = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
                ]
            ],
            role: ['', [Validators.required, noAdminValidator]]
            
        });
    }

    switchMode(mode: 'login' | 'register') {
        this.authMode = mode;
        this.successMessage = null;
        this.errorMessage = null;
    }

    onLogin() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.authService.login(this.loginForm.value).subscribe(
                (response: any) => {
                    localStorage.setItem('token', response.token);
                    const decodedToken = jwtDecode(response.token);
                    console.log('Decoded JWT:', decodedToken);  //
                    this.successMessage = 'Login successful! Redirecting...';
                    this.errorMessage = null;
                    this.loading = false;
                    setTimeout(() => this.router.navigate(['/home']), 1500);
                },
                () => {
                    this.errorMessage = 'Invalid email or password';
                    this.successMessage = null;
                    this.loading = false;
                }
            );
        }
    }

    onRegister() {
        if (this.registerForm.valid) {
            this.loading = true;
            this.authService.register(this.registerForm.value).subscribe(
                () => {
                    this.successMessage = 'Registration successful!';
                    this.errorMessage = null;
                    this.loading = false;
                    this.activationPopup = true; // <--- Show popup
                },
                () => {
                    this.errorMessage = 'Registration failed. Please try again.';
                    this.successMessage = null;
                    this.loading = false;
                }
            );
        }
    }

    isSignupMode = false;

    toggleSignup() {
        this.isSignupMode = !this.isSignupMode;
    }


    activateAccount() {
        if (!this.activationToken || this.activationToken.length !== 6) {
            this.errorMessage = 'Please enter a valid 6-digit token.';
            return;
        }

        this.activationLoading = true;
        this.errorMessage = null;

        this.authService.activateAccount(this.activationToken).subscribe(
            () => {
                this.activationLoading = false;
                this.activationSuccess = true;
                setTimeout(() => {
                    this.activationPopup = false;
                    this.activationSuccess = false;
                    this.switchMode('login');
                }, 2000);
            },
            () => {
                this.activationLoading = false;
                this.errorMessage = 'Invalid or expired token. Try again.';
            }
        );
    }


}
