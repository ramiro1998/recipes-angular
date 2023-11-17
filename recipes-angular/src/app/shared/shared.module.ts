import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRecipeComponent } from './components/card-recipe/card-recipe.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { LengthDescriptionPipe } from './pipes/length-description.pipe';
import { BrokenImageDirective } from './directives/broken-image.directive';



@NgModule({
  declarations: [
    CardRecipeComponent,
    NavbarComponent,
    SearchBarComponent,
    LengthDescriptionPipe,
    BrokenImageDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    CardRecipeComponent,
    NavbarComponent,
    SearchBarComponent,
    LengthDescriptionPipe,
    BrokenImageDirective
  ]
})
export class SharedModule { }
