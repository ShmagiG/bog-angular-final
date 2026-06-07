import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, ClientService } from '../services/client.service';

@Component({
  selector: 'app-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {
  searchForm!: FormGroup;
  clients: Client[] = [];
  loading = false;
  searched = false;

  readonly columns = [
    { key: 'firstName',    label: 'სახელი'              },
    { key: 'lastName',     label: 'გვარი'               },
    { key: 'clientNumber', label: 'კლიენტის უნიკალური' },
  ];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      firstName:    [''],
      lastName:     [''],
      clientNumber: ['']
    });
  }

  onSearch(): void {
    this.loading = true;
    this.searched = false;

    this.clientService.search(this.searchForm.value).subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
        this.searched = true;
      },
      error: () => {
        this.clients = [];
        this.loading = false;
        this.searched = true;
      }
    });
  }

  onRegister(): void {
    // Navigate to client registration form (bpm001 – to be implemented)
    this.router.navigate(['/bpm/register']);
  }

  onRowClick(client: Client): void {
    // Navigate into client detail page (bpm002 – to be implemented)
    this.router.navigate(['/bpm/client', client.id]);
  }
}
