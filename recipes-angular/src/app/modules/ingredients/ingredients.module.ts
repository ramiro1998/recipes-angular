import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IngredientsPageComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    SharedModule
  ]
})
export class IngredientsModule { }
