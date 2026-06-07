import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account, AccountService } from '../../../../shared/services/account.service';
import { ClientStateService } from '../../../../shared/services/client-state.service';
import { OperationService } from '../../../../shared/services/operation.service';

@Component({ selector: 'app-pmd311', templateUrl: './pmd311.component.html', styleUrls: ['./pmd311.component.scss'] })
export class Pmd311Component implements OnInit {
  form!: FormGroup;
  allAccounts: Account[] = [];
  loading = false;
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private accountSvc: AccountService,
    private opSvc: OperationService,
    private cs: ClientStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      senderAccountKey:   ['', Validators.required],
      receiverAccountKey: ['', Validators.required],
      amount: [0, [Validators.min(0)]]
    });
    // Load ALL accounts for select options
    const client = this.cs.getClient();
    if (client) {
      this.accountSvc.getByClient(client.id).subscribe(data => this.allAccounts = data);
    }
  }

  get sa() { return this.form.get('senderAccountKey')!; }
  get ra() { return this.form.get('receiverAccountKey')!; }
  get am() { return this.form.get('amount')!; }

  errMsg(c: any): string {
    if (c.hasError('required')) return 'ველი აუცილებელია';
    if (c.hasError('min'))      return 'მინიმუმ 0';
    return '';
  }

  getAccount(id: string): Account | undefined { return this.allAccounts.find(a => a.id === id); }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const sender   = this.getAccount(this.sa.value);
    const receiver = this.getAccount(this.ra.value);
    if (!sender || !receiver) { this.serverError = 'ანგარიში ვერ მოიძებნა'; return; }
    if (sender.id === receiver.id) { this.serverError = 'გამგზავნი და მიმღები ერთი ანგარიშია'; return; }
    if (sender.balance < this.am.value) { this.serverError = 'არასაკმარისი ბალანსი'; return; }

    this.loading = true; this.serverError = '';
    this.opSvc.transfer({
      senderAccountKey:   sender.id,
      receiverAccountKey: receiver.id,
      amount: this.am.value,
      senderBalance:   sender.balance,
      receiverBalance: receiver.balance
    }).subscribe({
      next: () => {
        this.loading = false;
        this.cs.updateAssets(-this.am.value);
        this.router.navigate(['/krn/accounts']);
      },
      error: () => { this.loading = false; this.serverError = 'გადარიცხვა ვერ მოხერხდა'; }
    });
  }
}
