import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const BASE = 'https://bog-angular-training-default-rtdb.asia-southeast1.firebasedatabase.app';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  plusPoints: number;
  photoUrl?: string;
  clientNumber?: string;
}

export interface ClientSearchParams { firstName?: string; lastName?: string; clientNumber?: string; }

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) {}

  search(params: ClientSearchParams): Observable<Client[]> {
    return this.http.get<Record<string, any>>(`${BASE}/clients.json`).pipe(
      map(data => {
        if (!data) return [];
        return Object.entries(data)
          .map(([id, v]) => ({ id, ...v } as Client))
          .filter(c => {
            if (params.firstName && !c.firstName?.toLowerCase().includes(params.firstName.toLowerCase())) return false;
            if (params.lastName  && !c.lastName?.toLowerCase().includes(params.lastName.toLowerCase()))  return false;
            if (params.clientNumber && !String(c.clientNumber ?? '').includes(params.clientNumber))      return false;
            return true;
          });
      })
    );
  }

  getById(id: string): Observable<Client> {
    return this.http.get<any>(`${BASE}/clients/${id}.json`).pipe(
      map(v => ({ id, ...v } as Client))
    );
  }

  create(payload: { firstName: string; lastName: string; plusPoints: number }): Observable<Client> {
    return this.http.post<{ name: string }>(`${BASE}/clients.json`, payload).pipe(
      map(res => ({ id: res.name, ...payload }))
    );
  }
}
