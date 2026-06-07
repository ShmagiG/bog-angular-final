import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  clientNumber: string;
}

export interface ClientSearchRequest {
  firstName?: string;
  lastName?: string;
  clientNumber?: string;
}

// Mock data – replace with real HTTP calls when API is ready
const MOCK_CLIENTS: Client[] = [
  { id: 1,  firstName: 'დავით',  lastName: 'ბერიძე',     clientNumber: '17' },
  { id: 2,  firstName: 'Test',   lastName: 'Tester',      clientNumber: '21' },
  { id: 3,  firstName: 'Test 2', lastName: 'Tester',      clientNumber: '20' },
  { id: 4,  firstName: 'Test 5', lastName: 'Tester',      clientNumber: '1'  },
  { id: 5,  firstName: 'Test 3', lastName: 'Tester',      clientNumber: '19' },
  { id: 6,  firstName: 'Test 4', lastName: 'Tester',      clientNumber: '18' },
];

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'https://api.example.com/bpm';

  constructor(private http: HttpClient) {}

  search(params: ClientSearchRequest): Observable<Client[]> {
    // ── Real API call (uncomment when ready) ──────────────────────────
    // let httpParams = new HttpParams();
    // if (params.firstName)    httpParams = httpParams.set('firstName',    params.firstName);
    // if (params.lastName)     httpParams = httpParams.set('lastName',     params.lastName);
    // if (params.clientNumber) httpParams = httpParams.set('clientNumber', params.clientNumber);
    // return this.http.get<Client[]>(`${this.apiUrl}/clients`, { params: httpParams });
    // ─────────────────────────────────────────────────────────────────

    // Mock: filter locally, simulate network delay
    const q = params;
    const result = MOCK_CLIENTS.filter(c => {
      if (q.firstName    && !c.firstName.toLowerCase().includes(q.firstName.toLowerCase()))    return false;
      if (q.lastName     && !c.lastName.toLowerCase().includes(q.lastName.toLowerCase()))     return false;
      if (q.clientNumber && !c.clientNumber.includes(q.clientNumber))                         return false;
      return true;
    });
    return of(result).pipe(delay(400));
  }
}
