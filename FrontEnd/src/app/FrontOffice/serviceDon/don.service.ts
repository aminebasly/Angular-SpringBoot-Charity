import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonService {
  analyzeDonations(List: any[]) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:8082';
  private translationUrl = 'http://localhost:8082/api/translate'; // TON ENDPOINT BACK-END


  constructor(private http: HttpClient,) { }

  AjoutDon(donData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/donations/add`, donData);
  }

  updateDonation(donationId: number, updatedDon: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/donations/update/${donationId}`, updatedDon);
  }
  
    // 🔹 FONCTION POUR TRADUIRE DU TEXTE
    translateText(text: string): Observable<any> {
      return this.http.post(`${this.translationUrl}`, { text: text }, { responseType: 'json' });
    }
    
  

  ListDon(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/donations`);
  }
    // ✅ Obtenir le total des donations
    getTotalDonations(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/donations/statistics/total`);
    }
  
    // ✅ Obtenir les donations par type
    getDonationsByType(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/donations/statistics/by-type`);
    }
  
    // ✅ Obtenir les donations par mois
    getDonationsByMonth(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/donations/statistics/by-month`);
    }
  
    // ✅ Obtenir les donations par année
    getDonationsByYear(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/donations/statistics/by-year`);
    }
  
    // ✅ Exporter les donations au format PDF
    exportDonationsToPDF(): Observable<any> {
      return this.http.get(`${this.baseUrl}/api/donations/export/pdf`, { responseType: 'blob' });
    }

  
    getPrediction(): Observable<string> {
  return this.http.get('http://localhost:8082/api/donations/predict', {
    responseType: 'text'
  });
}
// serviceDon/don.service.ts
toxicityCheck(text: string) {
  return this.http.get<any>('http://localhost:8082/api/donations/toxicity-check', {
    params: { text: text }
  });
}


    
  
  
}
