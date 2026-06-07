import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BpmRoutingModule } from './bpm-routing.module';
import { Bpm000Component } from './bpm000/bpm000.component';
import { Bpm001Component } from './bpm001/bpm001.component';

@NgModule({
  declarations: [Bpm000Component, Bpm001Component],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, BpmRoutingModule]
})
export class BpmModule {}
