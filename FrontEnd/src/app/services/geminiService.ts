// src/app/services/gemini.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class GeminiService {
    private readonly API_KEY = 'AIzaSyDTMM6xkEgo7hVzc5YkU3E6cUQdwSPxC2E'; // 🚨 Don't expose in production!
    private readonly endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    async predictEventDate(category: string, description: string): Promise<string> {
        const prompt = `Based on the following event category and description, predict only a close realistic future date after this day which is 06/05/2025 for the event (in YYYY-MM-DD format). 
Category: ${category}
Description: ${description}`;

        const body = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };

        try {
            const response = await axios.post(
                `${this.endpoint}?key=${this.API_KEY}`,
                body,
                { headers: { 'Content-Type': 'application/json' } }
            );

            const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
            return result?.match(/\d{4}-\d{2}-\d{2}/)?.[0] || '';
        } catch (error) {
            console.error('Gemini API error:', error);
            return '';
        }
    }
}
