import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  token: string;
}

const STORAGE_KEY = 'bog_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Replace with your actual API base URL
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<AuthUser> {
    // Uncomment when real API is ready:
    // return this.http.post<AuthUser>(`${this.apiUrl}/auth/login`, payload).pipe(
    //   tap(user => this.saveUser(user))
    // );

    // Mock for development
    const mock: AuthUser = { id: 1, name: 'Demo User', username: payload.username, token: 'mock-token-123' };
    return of(mock).pipe(tap(user => this.saveUser(user)));
  }

  register(payload: RegisterRequest): Observable<AuthUser> {
    // Uncomment when real API is ready:
    // return this.http.post<AuthUser>(`${this.apiUrl}/auth/register`, payload).pipe(
    //   tap(user => this.saveUser(user))
    // );

    // Mock for development
    const mock: AuthUser = { id: 2, name: payload.name, username: payload.username, token: 'mock-token-456' };
    return of(mock).pipe(tap(user => this.saveUser(user)));
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private saveUser(user: AuthUser): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}
