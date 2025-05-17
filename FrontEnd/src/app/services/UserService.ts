// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8082/User'; // Adjust port if needed

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}/all`);
    }
    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/add`, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/updateUser/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/deleteUser/${id}`);
    }

    advancedSearchUsers(keyword: string): Observable<User[]> {
        let params = new HttpParams().set('keyword', keyword);
        return this.http.get<User[]>(`${this.apiUrl}/advancedSearchUsers`, { params });
    }
}