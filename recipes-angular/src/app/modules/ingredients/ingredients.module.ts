import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsPageComponent } from './pages/ingredients-page/ingredients-page.component';


@NgModule({
  declarations: [
    IngredientsPageComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule
  ]
})
export class IngredientsModule { }
