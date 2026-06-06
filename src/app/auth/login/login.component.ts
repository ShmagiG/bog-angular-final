import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
      ]
    });
  }

  get username() { return this.form.get('username')!; }
  get password() { return this.form.get('password')!; }

  getUsernameError(): string {
    const ctrl = this.username;
    if (ctrl.hasError('required')) return 'სახელი აუცილებელია';
    if (ctrl.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (ctrl.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  getPasswordError(): string {
    const ctrl = this.password;
    if (ctrl.hasError('required')) return 'პაროლი აუცილებელია';
    if (ctrl.hasError('minlength')) return 'მინიმუმ 2 სიმბოლო';
    if (ctrl.hasError('maxlength')) return 'მაქსიმუმ 30 სიმბოლო';
    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = null;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err?.error?.message || 'შესვლა ვერ მოხერხდა';
      }
    });
  }
}
