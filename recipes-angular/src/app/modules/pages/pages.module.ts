import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PageComponent } from './page/page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
