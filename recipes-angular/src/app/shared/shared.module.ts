import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRecipeComponent } from './components/card-recipe/card-recipe.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';



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
