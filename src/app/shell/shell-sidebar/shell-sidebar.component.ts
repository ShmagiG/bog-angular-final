import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({ selector: 'app-shell-sidebar', templateUrl: './shell-sidebar.component.html', styleUrls: ['./shell-sidebar.component.scss'] })
export class ShellSidebarComponent {
  user: any;
  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
  }
}
