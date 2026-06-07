import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
      },
      { validators: passwordMatchValidator }
    );
  }

  get name() { return this.form.get('name')!; }
  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  getNameError(): string {
    const c = this.name;
    if (c.hasError('required')) return 'სახელი აუცილებელია';
    if (c.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (c.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  getUsernameError(): string {
    const c = this.username;
    if (c.hasError('required')) return 'მომხმარებელი აუცილებელია';
    if (c.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (c.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  getPasswordError(): string {
    const c = this.password;
    if (c.hasError('required')) return 'პაროლი აუცილებელია';
    if (c.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (c.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  getConfirmPasswordError(): string {
    const c = this.confirmPassword;
    if (c.hasError('required')) return 'გამეორება აუცილებელია';
    if (c.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (c.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    if (this.form.hasError('passwordMismatch') && c.touched) return 'პაროლები არ ემთხვევა';
    return '';
  }

  isConfirmInvalid(): boolean {
    return (
      (this.confirmPassword.invalid && this.confirmPassword.touched) ||
      (this.form.hasError('passwordMismatch') && this.confirmPassword.touched)
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = null;

    const { confirmPassword, ...payload } = this.form.value;

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err?.error?.message || 'რეგისტრაცია ვერ მოხერხდა';
      }
    });
  }
}
