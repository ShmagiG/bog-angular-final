import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bpm000Component } from './bpm000/bpm000.component';
import { Bpm001Component } from './bpm001/bpm001.component';

const routes: Routes = [
  { path: 'bpm000', component: Bpm000Component },
  { path: 'bpm001', component: Bpm001Component },
  { path: '', redirectTo: 'bpm000', pathMatch: 'full' }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class BpmRoutingModule {}
