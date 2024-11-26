import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailData } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api';
  private adminEmail = 'cesarenriquegaraygarcia@gmail.com';

  constructor(private http: HttpClient) { }

  sendPurchaseConfirmation(orderData: any): Observable<any> {
    const emailData: EmailData = {
      adminEmail: this.adminEmail,
      customerEmail: orderData.payer.email_address,
      order: orderData,
      items: orderData.purchase_units[0].items,
      total: orderData.purchase_units[0].amount.value,
      customerName: `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`,
      orderDate: new Date().toISOString()
    };
    
    return this.http.post(`${this.apiUrl}/send-email`, emailData);
  }
}