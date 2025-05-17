import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Testimonial } from '../models/Testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'http://localhost:8082/testimonials'; // Adjust to your backend URL
  


  constructor(private http: HttpClient) {}

  // Create a testimonial
  createTestimonial(testimonial: Testimonial): Observable<Testimonial> {
    return this.http.post<Testimonial>(`${this.apiUrl}/create`, testimonial).pipe(
      catchError(this.handleError)
    );
  }

  // Get all testimonials
  getAllTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/GetAll`).pipe(
      catchError(this.handleError)
    );
  }

  // Get testimonial by ID
  getTestimonialById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update a testimonial
  updateTestimonial(id: number, testimonial: Testimonial): Observable<Testimonial> {
    return this.http.put<Testimonial>(`${this.apiUrl}/${id}`, testimonial).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a testimonial
  deleteTestimonial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Search testimonials (assuming TestimonialSearchCriteria is defined)
  searchTestimonials(criteria: any): Observable<Testimonial[]> {
    return this.http.post<Testimonial[]>(`${this.apiUrl}/search`, criteria).pipe(
      catchError(this.handleError)
    );
  }

  getSentimentReport() {
    return this.http.get<any>('http://localhost:8082/testimonials/analysis'); // adjust the URL as needed
  }


  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}