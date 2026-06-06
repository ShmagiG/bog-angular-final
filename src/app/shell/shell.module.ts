import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShellRoutingModule } from './shell-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ShellRoutingModule,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent
  ]
})
export class ShellModule {}
