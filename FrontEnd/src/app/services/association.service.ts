import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Association } from '../models/Association';
import { AssociationDashboardDTO } from '../models/AssociationDashboardDTO';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {
  private baseUrl = 'http://localhost:8082/Association';
  private dashboardUrl = 'http://localhost:8082/dashboard';
  private DocumentUrl = 'http://localhost:8082/documents';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les associations
  getAllAssociations(): Observable<Association[]> {
    return this.http.get<Association[]>(`${this.baseUrl}/GetAll`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer une association par ID
  getAssociationById(associationId: number): Observable<Association> {
    return this.http.get<Association>(`${this.baseUrl}/${associationId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Créer une nouvelle association
  createAssociation(association: Association): Observable<Association> {
    return this.http.post<Association>(`${this.baseUrl}/Create`, association)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour une association
  updateAssociation(associationId: number, association: Association): Observable<Association> {
    return this.http.put<Association>(`${this.baseUrl}/${associationId}`, association)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Supprimer une association
  deleteAssociation(associationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${associationId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Valider une association
  validateAssociation(associationId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/validate/${associationId}`, null)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Assigner un cas à une association
  assignCaseToAssociation(caseTitle: string, associationName: string): Observable<string> {
    const params = { caseTitle, associationName };
    return this.http.post<string>(`${this.baseUrl}/assign-case-to-association`, null, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Assigner un membre à une association
  assignMemberToAssociation(username: string, associationName: string): Observable<string> {
    const params = { username, associationName };
    return this.http.post<string>(`${this.baseUrl}/assign-member-to-association`, null, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer le dashboard des associations
  getAssociationDashboard(): Observable<AssociationDashboardDTO> {
    return this.http.get<AssociationDashboardDTO>(`${this.dashboardUrl}/associations`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Nouvelle méthode pour vérifier un document
 // Nouvelle méthode pour vérifier un document
 verifyDocument(file: File, name: string, date: string): Observable<string> {
  // Convert date to dd/MM/yyyy format
  const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('/'); // Ensures dd/MM/yyyy

  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('name', name);
  formData.append('foundingDate', formattedDate); // Send formatted date

  return this.http.post(`${this.DocumentUrl}/associations/verify-document`, formData, {
    responseType: 'text'
  }).pipe(
    map(response => response),
    catchError(this.handleError)
  );
}


// Add this helper function inside the same service



  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}, message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

export { Association };