import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participation } from '../models/participation';
import { Event } from 'src/app/models/event';

@Injectable({
    providedIn: 'root'
})
export class ParticipationService {
    private apiUrl = 'http://localhost:8082/api/participations'; // Adjust port if needed

    constructor(private http: HttpClient) { }

    getAllParticipations(page: number, size: number): Observable<Participation[]> {
        return this.http.get<Participation[]>(`${this.apiUrl}/all?page=${page}&size=${size}`);
    }

    updateParticipation(id: number, participation: Participation): Observable<Participation> {
        return this.http.put<Participation>(`${this.apiUrl}/updateParticipation/${id}`, participation);
    }

    deleteParticipation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteParticipation/${id}`);
    }

    addParticipation(eventTitle: string, username: string): Observable<any> {
        const url = `${this.apiUrl}/addParticipation/${eventTitle}?username=${username}`;
        return this.http.post(url, {});
    }
    advancedSearchParticipations(keyword?: string): Observable<Participation[]> {
        let params = new HttpParams();
        if (keyword && keyword.trim()) {
            params = params.set('keyword', keyword.trim());
        }
        return this.http.get<Participation[]>(`${this.apiUrl}/advancedSearchParticipations`, { params });
    }
    getParticipationStatsByEventType(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/stats/by-event-type`);
    }
}