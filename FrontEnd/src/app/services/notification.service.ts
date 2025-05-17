import { Inject, Injectable } from "@angular/core";
import { getMessaging, getToken } from "firebase/messaging";

// Modifiez cette classe pour inclure une liste de notifications
@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Propriété pour stocker les notifications avec les bonnes propriétés
  notifications: { title: string; body: string; hidden: boolean; message: string }[] = [];

  constructor(@Inject('FIREBASE_MESSAGING_SW_PATH') private readonly swPath: string) {}

  // Méthode pour demander la permission et obtenir un token
  async requestPermission(): Promise<string | null> {
    try {
      const messaging = getMessaging();
      const token = await getToken(messaging, {
        vapidKey: 'BFWW13rFTd0A-mzqO_JWVrnilQlAVLbrb4LUwb-gLDu6gJAs_5OdQnQSdd-gTlmNF5F1ud7SruDNu5Bw4RlSpj0',
        serviceWorkerRegistration: await navigator.serviceWorker.register(this.swPath)
      });

      if (token) {
        console.log('Token reçu:', token);
        // Ajouter une notification de test avec toutes les propriétés requises
        this.notifications.push({
          title: 'Nouvelle Notification',
          body: 'Voici une notification de test.',
          hidden: false, // Ajout de la propriété
          message: 'Ceci est un message de test' // Ajout de la propriété
        });
      }

      return token;
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
      return null;
    }
  }

  // Méthode pour récupérer les notifications
  getNotifications(): { hidden: boolean; message: string; title: string; body: string }[] {
    return this.notifications;
  }
}

