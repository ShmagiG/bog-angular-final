import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pmd311Component } from './pmd311/pmd311.component';
import { ClientGuard } from '../../../shared/guards/client.guard';

const routes: Routes = [
  { path: 'pmd311', component: Pmd311Component, canActivate: [ClientGuard] },
  { path: '', redirectTo: 'pmd311', pathMatch: 'full' }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PmdRoutingModule {}
