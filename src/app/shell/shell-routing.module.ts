import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'bpm',  loadChildren: () => import('./modules/bpm/bpm.module').then(m => m.BpmModule) },
      { path: 'krn',  loadChildren: () => import('./modules/krn/krn.module').then(m => m.KrnModule) },
      { path: 'pmd',  loadChildren: () => import('./modules/pmd/pmd.module').then(m => m.PmdModule) },
      { path: '', redirectTo: 'bpm/bpm000', pathMatch: 'full' }
    ]
  }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ShellRoutingModule {}
