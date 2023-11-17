import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/pages/pages.module').then((m) => m.PagesModule),
    canActivate: [sessionGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
