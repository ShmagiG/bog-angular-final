import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KrnicpComponent } from './krnicp/krnicp.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './accounts/create-account/create-account.component';
import { OperationsComponent } from './operations/operations.component';
import { ClientGuard } from '../../../shared/guards/client.guard';

const routes: Routes = [
  { path: 'krnicp',          component: KrnicpComponent,        canActivate: [ClientGuard] },
  { path: 'accounts',        component: AccountsComponent,      canActivate: [ClientGuard] },
  { path: 'accounts/create', component: CreateAccountComponent, canActivate: [ClientGuard] },
  { path: 'operations',      component: OperationsComponent,    canActivate: [ClientGuard] },
  { path: '', redirectTo: 'krnicp', pathMatch: 'full' }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class KrnRoutingModule {}
