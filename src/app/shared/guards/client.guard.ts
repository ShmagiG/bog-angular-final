import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClientStateService } from '../services/client-state.service';

@Injectable({ providedIn: 'root' })
export class ClientGuard implements CanActivate {
  constructor(private cs: ClientStateService, private router: Router) {}
  canActivate(): boolean {
    if (this.cs.getClient()) return true;
    this.router.navigate(['/bpm/bpm000']);
    return false;
  }
}
