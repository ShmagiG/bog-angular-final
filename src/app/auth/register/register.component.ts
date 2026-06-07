import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

const pwdMatch: ValidatorFn = (g: AbstractControl): ValidationErrors | null =>
  g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };

@Component({ selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.scss'] })
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  serverError = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      name:            ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      username:        ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password:        ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    }, { validators: pwdMatch });
  }

  get n()  { return this.form.get('name')!; }
  get u()  { return this.form.get('username')!; }
  get p()  { return this.form.get('password')!; }
  get cp() { return this.form.get('confirmPassword')!; }

  errMsg(ctrl: any): string {
    if (ctrl.hasError('required'))   return 'ველი აუცილებელია';
    if (ctrl.hasError('minlength'))  return 'მინიმუმ 2 სიმბოლო';
    if (ctrl.hasError('maxlength'))  return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  confirmErr(): string {
    if (this.cp.hasError('required'))  return 'ველი აუცილებელია';
    if (this.cp.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (this.form.hasError('mismatch') && this.cp.touched) return 'პაროლები არ ემთხვევა';
    return '';
  }

  isConfirmInvalid(): boolean {
    return (this.cp.invalid && this.cp.touched) || (!!this.form.errors?.['mismatch'] && this.cp.touched);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.serverError = '';
    this.auth.register({ name: this.n.value, username: this.u.value, password: this.p.value }).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: () => { this.loading = false; this.serverError = 'რეგისტრაცია ვერ მოხერხდა'; }
    });
  }
}
