import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { BpmRoutingModule } from './bpm-routing.module';
import { Bpm000Component } from './bpm000/bpm000.component';

@NgModule({
  declarations: [Bpm000Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BpmRoutingModule
  ]
})
export class BpmModule {}
