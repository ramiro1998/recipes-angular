import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRecipeComponent } from './components/card-recipe/card-recipe.component';



@NgModule({
  declarations: [
    CardRecipeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardRecipeComponent
  ]
})
export class SharedModule { }
