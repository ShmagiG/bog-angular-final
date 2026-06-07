import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from './account.service';

const BASE = 'https://bog-angular-training-default-rtdb.asia-southeast1.firebasedatabase.app';

export interface TransferPayload {
  senderAccountKey: string;
  receiverAccountKey: string;
  amount: number;
  senderBalance: number;
  receiverBalance: number;
}

@Injectable({ providedIn: 'root' })
export class OperationService {
  constructor(private http: HttpClient, private accountService: AccountService) {}

  transfer(payload: TransferPayload): Observable<void> {
    // Log operation then update both account balances
    const op = {
      senderAccountKey: payload.senderAccountKey,
      receiverAccountKey: payload.receiverAccountKey,
      amount: payload.amount,
      createdAt: new Date().toISOString()
    };

    const newSenderBalance  = payload.senderBalance  - payload.amount;
    const newReceiverBalance = payload.receiverBalance + payload.amount;

    return this.http.post(`${BASE}/operations.json`, op).pipe(
      switchMap(() => this.http.patch<void>(`${BASE}/accounts/${payload.senderAccountKey}.json`,   { balance: newSenderBalance })),
      switchMap(() => this.http.patch<void>(`${BASE}/accounts/${payload.receiverAccountKey}.json`, { balance: newReceiverBalance }))
    );
  }
}
