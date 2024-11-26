import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbaseService {
  private apiUrl = 'https://www.chatbase.co/api/v1/chat'; // Cambia al endpoint de Chatbase
  private apiKey = 'bmgVtfU-bT-iI-5f93CzT';

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
    });
    const body = { message: userMessage };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
