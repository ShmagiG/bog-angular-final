import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ClientStateService } from '../../shared/services/client-state.service';

@Component({ selector: 'app-shell-header', templateUrl: './shell-header.component.html', styleUrls: ['./shell-header.component.scss'] })
export class ShellHeaderComponent implements OnInit {
  today = '';
  constructor(private auth: AuthService, private cs: ClientStateService, private router: Router) {}
  ngOnInit() {
    const d = new Date();
    this.today = [String(d.getDate()).padStart(2,'0'), String(d.getMonth()+1).padStart(2,'0'), d.getFullYear()].join('/');
  }
  logout() {
    this.cs.clearClient();
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
