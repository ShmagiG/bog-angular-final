import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bpm000Component } from './bpm000/bpm000.component';

const routes: Routes = [
  {
    path: '',
    component: Bpm000Component
  }
  // Future routes:
  // { path: 'register',    component: Bpm001Component },
  // { path: 'client/:id',  component: Bpm002Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpmRoutingModule {}
