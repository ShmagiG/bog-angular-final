import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-operations', templateUrl: './operations.component.html', styleUrls: ['./operations.component.scss'] })
export class OperationsComponent {
  constructor(private router: Router) {}
  goTransfer() { this.router.navigate(['/pmd/pmd311']); }
}
