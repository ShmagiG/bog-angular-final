import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../../../shared/services/account.service';
import { ClientStateService } from '../../../../../shared/services/client-state.service';

@Component({ selector: 'app-create-account', templateUrl: './create-account.component.html', styleUrls: ['./create-account.component.scss'] })
export class CreateAccountComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  serverError = '';

  constructor(private fb: FormBuilder, private accountSvc: AccountService, private cs: ClientStateService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      balance:     [0,  [Validators.min(0)]]
    });
  }

  get an() { return this.form.get('accountName')!; }
  get ba() { return this.form.get('balance')!; }

  errMsg(c: any): string {
    if (c.hasError('required'))  return 'ველი აუცილებელია';
    if (c.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (c.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    if (c.hasError('min'))       return 'გთხოვთ შეიყვანოთ მინიმუმ 0';
    return '';
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const client = this.cs.getClient();
    if (!client) return;
    this.loading = true; this.serverError = '';
    const payload = { clientId: client.id, ownerName: `${client.firstName} ${client.lastName}`, ...this.form.value };
    this.accountSvc.create(payload).subscribe({
      next: (acc) => {
        this.loading = false;
        this.cs.updateAssets(acc.balance || 0);
        this.router.navigate(['/krn/accounts']);
      },
      error: () => { this.loading = false; this.serverError = 'ანგარიშის შექმნა ვერ მოხერხდა'; }
    });
  }
}
