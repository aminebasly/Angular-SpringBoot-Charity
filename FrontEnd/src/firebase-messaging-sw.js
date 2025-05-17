importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCdi0QRzIpbrQrmrxvjQ_JjhhuA36m1poM",
  authDomain: "charity-notifications.firebaseapp.com",
  projectId: "charity-notifications",
  storageBucket: "charity-notifications.appspot.com",
  messagingSenderId: "425217243020",
  appId: "1:425217243020:web:d8a9ecceb865ab469988a9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Message en arrière-plan:', payload);
  
  const notificationTitle = payload.notification?.title || 'Nouvelle notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/assets/icons/icon-72x72.png',
    data: { url: payload.data?.url || '/' } // Pour la navigation au clic
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Gestion du clic sur la notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});