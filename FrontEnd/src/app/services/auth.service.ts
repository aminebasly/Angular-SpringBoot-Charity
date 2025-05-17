import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Use named import
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = 'http://localhost:8082/api/auth/login';
    private registerUrl = 'http://localhost:8082/api/auth/register';

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(this.loginUrl, credentials);
    }
    register(credentials: { username: string; email: string; password: string; role: string; birthDate: string }): Observable<any> {
        return this.http.post<any>(this.registerUrl, credentials);
    }
    getUsernameFromToken(): string | null {
        const token = localStorage.getItem('token'); // Replace with your token storage logic
        if (token) {
            const decodedToken: any = jwtDecode(token);
            return decodedToken?.sub || null; // Adjust based on your token structure
        }
        return null;
    }
    getUserRole(): string | null {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                // Read from authorities array
                return decodedToken?.authorities?.[0] || null;
            } catch (error) {
                console.error('Invalid token:', error);
                return null;
            }
        }
        return null;
    }

    activateAccount(token: string) {
        return this.http.get(`http://localhost:8082/api/auth/activate-account?token=${token}`);
    }
}