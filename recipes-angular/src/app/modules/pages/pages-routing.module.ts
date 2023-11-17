import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { sessionGuard } from 'src/app/core/guards/session.guard';

const routes: Routes = [
  {
    path: '', component: PageComponent, /* canActivate: [sessionGuard], */ children: [
      {
        path: '', loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
      },
      // {
      //   path: '**', redirectTo: ''
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
