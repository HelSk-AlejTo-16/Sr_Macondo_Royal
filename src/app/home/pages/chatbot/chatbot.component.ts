import { Component } from '@angular/core';
import { ChatbaseService } from '../../../services/bot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chatbot.component.html',
  
})
export class ChatbotComponent {
  userMessage = '';
  messages: { text: string; sender: string }[] = [];

  constructor(private chatbaseService: ChatbaseService) {}

  sendMessage() {
    this.messages.push({ text: this.userMessage, sender: 'user' });
    this.chatbaseService.sendMessage(this.userMessage).subscribe((response) => {
      this.messages.push({ text: response.reply, sender: 'bot' });
      this.userMessage = '';
    });
  }
}
