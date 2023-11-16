import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: ['./card-recipe.component.css']
})
export class CardRecipeComponent {
  @Input() recipe!: Recipe

  constructor(private route: Router) { }


  goIndividualRecipe(recipe: Recipe) {
    this.route.navigate([`/recipe/${recipe._id}`])
  }
}
