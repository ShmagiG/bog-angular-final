import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PmdRoutingModule } from './pmd-routing.module';
import { Pmd311Component } from './pmd311/pmd311.component';

@NgModule({
  declarations: [Pmd311Component],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PmdRoutingModule]
})
export class PmdModule {}
