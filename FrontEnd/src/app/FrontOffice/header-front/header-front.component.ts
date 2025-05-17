import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
    constructor(private authService: AuthService) {}

    isAdmin(): boolean {
        return this.authService.getUserRole() === 'ROLE_ADMIN';
    }

}
