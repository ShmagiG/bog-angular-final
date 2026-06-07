import { Component } from '@angular/core';
import { AuthService, AuthUser } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  user: AuthUser | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }
}
