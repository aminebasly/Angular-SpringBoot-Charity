// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importation des composants
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AuthComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventListComponent } from './FrontOffice/event/event-list/event-list.component';
import { ParticipationListComponent } from './BackOffice/participation-list/participation-list.component';
import { UserListComponent } from './BackOffice/user-list/user-list.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { AjoutDonComponent } from './FrontOffice/ajout-don/ajout-don.component';
import { UpdateDonComponent } from './FrontOffice/update-don/update-don.component';
import { DonationListComponent } from './BackOffice/donation-list/donation-list.component';
import { AfficheDonComponent } from './FrontOffice/affiche-don/affiche-don.component';
import { AssociationComponent } from './association/details/association.component';
import { TeslimonialListComponent } from './testimonial/teslimonial-list/teslimonial-list.component';
import { AssignmentComponent } from './Lists/assignment/assignment.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { RefugeeSupportListComponent } from './components/refugee-support-list/refugee-support-list.component';
import { NotificationComponent } from './notification/notification.component';
import {RefugeCenterComponent} from "./BackOffice/refuge-center/refuge-center.component";
import { adminGuard } from './Guards/admin.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EventFormComponent } from './FrontOffice/event/eventform/event-form.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: AllTemplateFrontComponent,
    children: [
      { path: '', component: HomeFrontComponent },
      { path: 'event', component: EventFormComponent },
      { path: 'login', component: AssignmentComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'afficheDon', component: AfficheDonComponent },
      { path: 'case', component: CaseListComponent },
      { path: 'refugee', component: RefugeeSupportListComponent }
    ]
  },
  {
    path: 'ajoutDon',
    component: AllTemplateFrontComponent,
    children: [
      { path: '', component: AjoutDonComponent }
    ]
  },
  // Route pour les notifications
  { path: 'notifications', component: NotificationComponent },
  { path: 'forbidden', component: ForbiddenComponent },



  {
    path: 'admin',
    component: AllTemplateBackComponent,
    children: [
      { path: 'list', component: AssociationComponent },
      { path: 'assign', component: AssignmentComponent },
      { path: 'testimonial', component: TeslimonialListComponent },
      { path: 'participation', component: ParticipationListComponent },
      { path: 'donationList', component: DonationListComponent },
      { path: 'user', component: UserListComponent },
        { path: "refuge", component: RefugeCenterComponent },
        { path: 'events', component: EventListComponent }, // Nested register (optional)

    ],canActivate: [adminGuard]
  },
  { path: 'user', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
