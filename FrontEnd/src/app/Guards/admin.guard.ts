import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role?: string;
  exp?: number;
  authorities?: string[];
}

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    // Check if token exists and is not expired
    if (!token) {
        router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    try {
        const payload = jwtDecode<JwtPayload>(token);
        const isExpired = payload.exp ? payload.exp * 1000 < Date.now() : false;

        if (isExpired) {
            localStorage.removeItem('token');
            router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // Check if user is admin
        const isAdmin = Array.isArray(payload.authorities) && payload.authorities.includes('ROLE_ADMIN');
        if (!isAdmin) {
            router.navigate(['/forbidden'], { queryParams: { error: 'Access denied. Admin only.' } });
            return false;
        }

        return true;
    } catch (error) {
        console.error('Invalid token:', error);
        router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};