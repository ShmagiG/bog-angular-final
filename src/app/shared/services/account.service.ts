import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE = 'https://bog-angular-training-default-rtdb.asia-southeast1.firebasedatabase.app';

export interface Account {
  id: string;
  clientId: string;
  ownerName: string;
  accountName: string;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  getByClient(clientId: string): Observable<Account[]> {
    return this.http.get<Record<string, any>>(`${BASE}/accounts.json`).pipe(
      map(data => {
        if (!data) return [];
        return Object.entries(data)
          .map(([id, v]) => ({ id, ...v } as Account))
          .filter(a => a.clientId === clientId);
      })
    );
  }

  create(payload: { clientId: string; ownerName: string; accountName: string; balance: number }): Observable<Account> {
    return this.http.post<{ name: string }>(`${BASE}/accounts.json`, payload).pipe(
      map(res => ({ id: res.name, ...payload }))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE}/accounts/${id}.json`);
  }
}
