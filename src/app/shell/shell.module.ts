import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellRoutingModule } from './shell-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ShellHeaderComponent } from './shell-header/shell-header.component';
import { ShellSidebarComponent } from './shell-sidebar/shell-sidebar.component';
import { ClientHeaderComponent } from './client-header/client-header.component';

@NgModule({
  declarations: [LayoutComponent, ShellHeaderComponent, ShellSidebarComponent, ClientHeaderComponent],
  imports: [CommonModule, RouterModule, ShellRoutingModule]
})
export class ShellModule {}
