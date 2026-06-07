import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, AccountService } from '../../../../shared/services/account.service';
import { ClientStateService } from '../../../../shared/services/client-state.service';

@Component({ selector: 'app-accounts', templateUrl: './accounts.component.html', styleUrls: ['./accounts.component.scss'] })
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  loading = false;

  constructor(private accountSvc: AccountService, private cs: ClientStateService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() {
    const c = this.cs.getClient();
    if (!c) return;
    this.loading = true;
    this.accountSvc.getByClient(c.id).subscribe({
      next: (data) => {
        this.accounts = data;
        this.loading = false;
        const total = data.reduce((s, a) => s + (a.balance || 0), 0);
        this.cs.setAssets(total);
      },
      error: () => { this.loading = false; }
    });
  }

  delete(acc: Account) {
    this.accountSvc.delete(acc.id).subscribe(() => this.load());
  }

  goCreate() { this.router.navigate(['/krn/accounts/create']); }
}
