import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  serverError = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

  get u() { return this.form.get('username')!; }
  get p() { return this.form.get('password')!; }

  errMsg(ctrl: any): string {
    if (ctrl.hasError('required'))   return 'ველი აუცილებელია';
    if (ctrl.hasError('minlength'))  return 'მინიმუმ 2 სიმბოლო';
    if (ctrl.hasError('maxlength'))  return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.serverError = '';
    this.auth.login(this.u.value, this.p.value).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: () => { this.loading = false; this.serverError = 'მომხმარებელი ვერ მოიძებნა'; }
    });
  }
}
