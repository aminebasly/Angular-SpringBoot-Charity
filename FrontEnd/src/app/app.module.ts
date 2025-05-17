import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { EventFormComponent } from './FrontOffice/event/eventform/event-form.component';
import { EventListComponent } from './FrontOffice/event/event-list/event-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ParticipationListComponent } from './BackOffice/participation-list/participation-list.component';
import { UserListComponent } from './BackOffice/user-list/user-list.component';
import { AjoutDonComponent } from './FrontOffice/ajout-don/ajout-don.component';
import { UpdateDonComponent } from './FrontOffice/update-don/update-don.component';
import { DonationListComponent } from './BackOffice/donation-list/donation-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AfficheDonComponent } from './FrontOffice/affiche-don/affiche-don.component';
import { AssociationComponent } from 'src/app/association/details/association.component';

import { TeslimonialListComponent } from './testimonial/teslimonial-list/teslimonial-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentComponent } from './Lists/assignment/assignment.component';


import { RefugeCenterComponent } from "./BackOffice/refuge-center/refuge-center.component";
import { FormComponent } from "./BackOffice/refuge-center/form/form.component";

import { CaseListComponent } from './components/case-list/case-list.component';
import { RefugeeSupportListComponent } from './components/refugee-support-list/refugee-support-list.component';
import { NotificationComponent } from './notification/notification.component';

import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {NgChartsModule} from "ng2-charts";
// Duplicate import removed


// Firebase imports (modular API v9+)
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ForbiddenComponent } from './forbidden/forbidden.component';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdi0QRzIpbrQrmrxvjQ_JjhhuA36m1poM",
  authDomain: "charity-notifications.firebaseapp.com",
  projectId: "charity-notifications",
  storageBucket: "charity-notifications.appspot.com",
  messagingSenderId: "425217243020",
  appId: "1:425217243020:web:d8a9ecceb865ab469988a9",
  databaseURL: "https://charity-notifications-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    HomeFrontComponent,
    RegisterComponent,
    AuthComponent,
    EventFormComponent,
    EventListComponent,
    ParticipationListComponent,
    UserListComponent,
    AssociationComponent,
    TeslimonialListComponent,
    AssignmentComponent,

    HomeFrontComponent,
    AjoutDonComponent,
    UpdateDonComponent,
    DonationListComponent,
    AfficheDonComponent,
    HomeFrontComponent,
    CaseListComponent,
    RefugeeSupportListComponent,
    RefugeCenterComponent,
    FormComponent,
    NotificationComponent,
    // Removed ForbiddenComponent from declarations


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ForbiddenComponent // Added ForbiddenComponent to imports
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: 'FIREBASE_MESSAGING_SW_PATH', useValue: '/firebase-messaging-sw.js' }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor() {
    this.registerServiceWorker();
  }

  private registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(err => {
          console.error('SW registration failed:', err);
        });
    }
  }
}
