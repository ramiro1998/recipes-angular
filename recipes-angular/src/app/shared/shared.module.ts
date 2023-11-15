import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRecipeComponent } from './components/card-recipe/card-recipe.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CardRecipeComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardRecipeComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
