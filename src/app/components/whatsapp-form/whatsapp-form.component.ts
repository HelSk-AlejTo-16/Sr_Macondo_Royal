import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './whatsapp-form.component.html',
  styleUrls: ['./whatsapp-form.component.css']
})
export class WhatsappFormComponent implements OnInit {
  phoneNumber: string = '';
  message: string = '';
  sending: boolean = false;
  status: { type: string, message: string } | null = null;
  messageHistory: any[] = [];
  showHistory: boolean = false;

  constructor(private whatsappService: WhatsappService) {}

  ngOnInit() {
    this.whatsappService.getMessageHistory().subscribe(history => {
      this.messageHistory = history;
    });
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  sendMessage() {
    if (!this.phoneNumber || !this.message) {
      this.status = {
        type: 'error',
        message: 'Por favor, completa todos los campos'
      };
      return;
    }

    this.sending = true;
    this.status = null;

    this.whatsappService.sendMessage(this.phoneNumber, this.message)
      .subscribe({
        next: (response) => {
          this.status = {
            type: 'success',
            message: 'Mensaje enviado correctamente'
          };
          this.phoneNumber = '';
          this.message = '';
        },
        error: (error) => {
          this.status = {
            type: 'error',
            message: 'Error al enviar el mensaje: ' + error.message
          };
        },
        complete: () => {
          this.sending = false;
        }
      });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}