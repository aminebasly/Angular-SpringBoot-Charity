import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:8082/api/events'; // Adjust if different

    constructor(private http: HttpClient) {}

    getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/all`);
    }

    createEvent(event: Event): Observable<Event> {
        console.log('Sending POST request with:', event); // Debug
        return this.http.post<Event>(`${this.apiUrl}/addEvent`, event);
    }

    deleteEvent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }

    updateEvent(id: number, event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.apiUrl}/updateEvent/${id}`, event);
    }
    advancedSearchEvents(search: string): Observable<Event[]> {
        let params = new HttpParams();
        if (search && search.trim()) {
            params = params.set('search', search.trim()); // Set the search parameter only if it exists and is not empty
        }
        return this.http.get<Event[]>(`${this.apiUrl}/advancedSearchEvents`, { params });
    }
    getRecommendedEvents(username: string): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/recommended/${username}`);
    }
    getEventsPaginated(page: number, size: number) {
        return this.http.get<any>(`${this.apiUrl}/paginated?page=${page}&size=${size}`);
    }


}