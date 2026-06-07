import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShellRoutingModule } from './shell-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
    // DashboardComponent removed – BPM module is now the default landing
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShellRoutingModule
  ]
})
export class ShellModule {}
