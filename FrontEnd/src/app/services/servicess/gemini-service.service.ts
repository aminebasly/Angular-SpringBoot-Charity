import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeminiServiceService {
  private apiUrl =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  private apiKey = "AIzaSyA-tIppE7CAYF1hQlROAaNokle191I4HB8"; // Replace with your Gemini API key

  constructor(private http: HttpClient) {}

  predictCaseType(description: string): Observable<any> {
    const body = {
      contents: [
        {
          parts: [
            {
              text: `Predict the charity case type for this description: "${description}". Respond with only one of these: MEDICAL, EDUCATION, EMERGENCY, FOOD, HOUSING, SDF, POOR, SINGLE_MUM, OTHER.`,
            },
          ],
        },
      ],
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, {
      headers,
    });
  }
  generateRecommendation(
    description: string,
    caseType: string
  ): Observable<any> {
    const body = {
      contents: [
        {
          parts: [
            {
              text: `Given the following charity case description: "${description}", and the case type "${caseType}", generate practical recommendations and actions to support this case in Tunisia. 
  Focus only on Tunisia-specific resources like Tunisian government aid, social security (CNSS), regional social services, charities, and realistic financial support calculations based on Tunisian economy. 
  Keep the response practical and under 3 lines.`,
            },
          ],
        },
      ],
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body, {
      headers,
    });
  }
}
