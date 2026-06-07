import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export interface AuthUser { id: string; name: string; username: string; token?: string; }

const BASE = 'https://bog-angular-training-default-rtdb.asia-southeast1.firebasedatabase.app';
const STORAGE_KEY = 'bog_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthUser> {
    return this.http.get<Record<string, any>>(`${BASE}/users.json`).pipe(
      map(data => {
        const users = data ? Object.entries(data).map(([id, v]) => ({ id, ...v })) : [];
        const found = users.find((u: any) => u.username === username && u.password === password);
        if (!found) throw new Error('invalid');
        return found as AuthUser;
      }),
      tap(u => localStorage.setItem(STORAGE_KEY, JSON.stringify(u)))
    );
  }

  register(payload: { name: string; username: string; password: string }): Observable<AuthUser> {
    return this.http.post<{ name: string }>(`${BASE}/users.json`, payload).pipe(
      map(res => ({ id: res.name, name: payload.name, username: payload.username })),
      tap(u => localStorage.setItem(STORAGE_KEY, JSON.stringify(u)))
    );
  }

  logout(): void { localStorage.removeItem(STORAGE_KEY); }
  isLoggedIn(): boolean { return !!this.getUser(); }
  getUser(): AuthUser | null {
    const r = localStorage.getItem(STORAGE_KEY);
    return r ? JSON.parse(r) : null;
  }
}
