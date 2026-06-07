import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  plusPoints: number;
  photoUrl?: string;
  clientNumber?: string;
  assets?: number;
}

const CLIENT_KEY = 'bog_active_client';

@Injectable({ providedIn: 'root' })
export class ClientStateService {
  private _client = new BehaviorSubject<ClientData | null>(this.loadFromStorage());
  client$ = this._client.asObservable();

  private _assets = new BehaviorSubject<number>(0);
  assets$ = this._assets.asObservable();

  setClient(c: ClientData): void {
    localStorage.setItem(CLIENT_KEY, JSON.stringify(c));
    this._client.next(c);
    this._assets.next(c.assets ?? 0);
  }

  clearClient(): void {
    localStorage.removeItem(CLIENT_KEY);
    this._client.next(null);
    this._assets.next(0);
  }

  getClient(): ClientData | null { return this._client.getValue(); }

  updateAssets(amount: number): void { this._assets.next(this._assets.getValue() + amount); }

  setAssets(total: number): void { this._assets.next(total); }

  private loadFromStorage(): ClientData | null {
    const r = localStorage.getItem(CLIENT_KEY);
    return r ? JSON.parse(r) : null;
  }
}
