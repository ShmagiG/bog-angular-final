import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../../shared/services/client.service';
import { ClientStateService } from '../../../../shared/services/client-state.service';

@Component({ selector: 'app-bpm001', templateUrl: './bpm001.component.html', styleUrls: ['./bpm001.component.scss'] })
export class Bpm001Component implements OnInit {
  form!: FormGroup;
  loading = false;
  serverError = '';

  constructor(private fb: FormBuilder, private clientSvc: ClientService, private cs: ClientStateService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      lastName:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      plusPoints: [0,  [Validators.min(0)]]
    });
  }

  get fn() { return this.form.get('firstName')!; }
  get ln() { return this.form.get('lastName')!; }
  get pp() { return this.form.get('plusPoints')!; }

  errMsg(c: any): string {
    if (c.hasError('required'))  return 'ველი აუცილებელია';
    if (c.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (c.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    if (c.hasError('min'))       return 'გთხოვთ შეიყვანოთ მინიმუმ 0';
    return '';
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.serverError = '';
    this.clientSvc.create(this.form.value).subscribe({
      next: (client) => {
        this.loading = false;
        this.cs.setClient({ ...client, assets: 0 });
        this.router.navigate(['/krn/krnicp']);
      },
      error: () => { this.loading = false; this.serverError = 'კლიენტის შექმნა ვერ მოხერხდა'; }
    });
  }
}
