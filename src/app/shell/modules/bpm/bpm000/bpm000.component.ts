import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, ClientService } from '../../../../shared/services/client.service';
import { ClientStateService } from '../../../../shared/services/client-state.service';
import { AccountService } from '../../../../shared/services/account.service';

@Component({ selector: 'app-bpm000', templateUrl: './bpm000.component.html', styleUrls: ['./bpm000.component.scss'] })
export class Bpm000Component implements OnInit {
  form!: FormGroup;
  clients: Client[] = [];
  loading = false;
  searched = false;

  constructor(
    private fb: FormBuilder,
    private clientSvc: ClientService,
    private clientState: ClientStateService,
    private accountSvc: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ firstName: [''], lastName: [''], clientNumber: [''] });
  }

  search() {
    this.loading = true; this.searched = false;
    this.clientSvc.search(this.form.value).subscribe({
      next: (data) => { this.clients = data; this.loading = false; this.searched = true; },
      error: () => { this.clients = []; this.loading = false; this.searched = true; }
    });
  }

  enterClient(c: Client) {
    // Load accounts to compute assets
    this.accountSvc.getByClient(c.id).subscribe(accounts => {
      const assets = accounts.reduce((sum, a) => sum + (a.balance || 0), 0);
      this.clientState.setClient({ ...c, assets });
      this.router.navigate(['/krn/krnicp']);
    });
  }

  goRegister() { this.router.navigate(['/bpm/bpm001']); }
}
