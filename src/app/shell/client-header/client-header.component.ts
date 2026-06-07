import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientStateService, ClientData } from '../../shared/services/client-state.service';

@Component({ selector: 'app-client-header', templateUrl: './client-header.component.html', styleUrls: ['./client-header.component.scss'] })
export class ClientHeaderComponent implements OnInit, OnDestroy {
  client: ClientData | null = null;
  assets = 0;
  private subs: Subscription[] = [];

  constructor(private cs: ClientStateService, private router: Router) {}

  ngOnInit() {
    this.subs.push(this.cs.client$.subscribe(c => this.client = c));
    this.subs.push(this.cs.assets$.subscribe(a => this.assets = a));
  }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }

  get isActive(): boolean { return !!this.client; }

  isRouteActive(segment: string): boolean { return this.router.url.includes(segment); }

  closeClient() { this.cs.clearClient(); this.router.navigate(['/bpm/bpm000']); }
}
