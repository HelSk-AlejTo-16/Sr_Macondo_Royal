import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface WhatsAppMessage {
  phoneNumber: string;
  message: string;
  timestamp: Date;
  status: 'sent' | 'error';
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private apiUrl = 'https://graph.facebook.com/v17.0/506350395886010/messages';
  private token = 'EAAMpJS4NZAjkBOZCGkEU2ZCXdtboiIFqcXok5NCXGud6uQCeDZB5XcE8SiUlz4U1xGSMdyEFhPquu6ZBZBPp1CARp6Y6S4yMj4wiCSDvMsm4sMVvlj1bkeRaKfZAU4WT4PPXyxTF4VS3CQ0ZBF8iUCs98fxlBGJI3STB71yl8bIlkwghpAPy9ZCjD67ZAIEhqgtN88VCM6csQoCHZBIX1JrXHszlL3c2OMZD';
  
  private messageHistory = new BehaviorSubject<WhatsAppMessage[]>([]);

  constructor(private http: HttpClient) {
    // Intentar cargar el historial del localStorage
    const savedHistory = localStorage.getItem('whatsapp_history');
    if (savedHistory) {
      this.messageHistory.next(JSON.parse(savedHistory));
    }
  }

  getMessageHistory(): Observable<WhatsAppMessage[]> {
    return this.messageHistory.asObservable();
  }

  private saveToHistory(message: WhatsAppMessage) {
    const currentHistory = this.messageHistory.value;
    const newHistory = [message, ...currentHistory];
    this.messageHistory.next(newHistory);
    localStorage.setItem('whatsapp_history', JSON.stringify(newHistory));
  }

  formatPhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (!cleaned.startsWith('52')) {
      return '52' + cleaned;
    }
    return cleaned;
  }

  sendMessage(phoneNumber: string, message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const formattedPhone = this.formatPhoneNumber(phoneNumber);

    const body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: formattedPhone,
      type: 'text',
      text: {
        preview_url: false,
        body: message
      }
    };

    return this.http.post(this.apiUrl, body, { headers }).pipe(
      tap({
        next: () => {
          this.saveToHistory({
            phoneNumber: formattedPhone,
            message,
            timestamp: new Date(),
            status: 'sent'
          });
        },
        error: (error) => {
          this.saveToHistory({
            phoneNumber: formattedPhone,
            message,
            timestamp: new Date(),
            status: 'error',
            error: error.message
          });
        }
      })
    );
  }
}