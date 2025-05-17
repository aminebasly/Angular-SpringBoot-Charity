import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forbidden',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './forbidden.component.html',
    styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {
    errorMessage: string | null = null;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.errorMessage = params['error'] || null;
        });
    }

    returnToLogin() {
        this.router.navigate(['/']);
    }

    goToHome() {
        this.router.navigate(['/home']);
    }
}