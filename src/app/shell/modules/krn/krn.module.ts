import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KrnRoutingModule } from './krn-routing.module';
import { KrnicpComponent } from './krnicp/krnicp.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import { OperationsComponent } from './operations/operations.component';

@NgModule({
  declarations: [KrnicpComponent, AccountsComponent, CreateAccountComponent, OperationsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, KrnRoutingModule]
})
export class KrnModule {}
