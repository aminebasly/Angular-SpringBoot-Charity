import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  // Propriété pour stocker les notifications
  notifications = this.notificationService.getNotifications();

  constructor(public notificationService: NotificationService) {}

  // Méthode pour demander la permission et obtenir un token
  requestPermission() {
    this.notificationService.requestPermission().then(token => {
      if (token) {
        console.log('Token reçu:', token);
        // Vous pouvez envoyer ce token au backend ici si nécessaire
      }
    });
  }
}
