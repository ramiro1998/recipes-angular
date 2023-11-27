import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css'],
})
export class IngredientsPageComponent implements OnInit {
  ingredientes: any[] = [];

  constructor(private recipes: RecipeService) {}


  ngOnInit(): void {
    this.recipes.getAllRecips().subscribe((recipes: any) => {
      // console.log(recipes);
      recipes.map((recipe: Recipe) => {
        recipe.ingredients.map((ingredient: any) => {
          // console.log(typeof(ingredient.amount))
          const existingItem = this.ingredientes.find((item) => item.name === ingredient.name);
          if (existingItem) {
            existingItem.amount = Number(existingItem.amount) + Number(ingredient.amount);
            return;
          }
          this.ingredientes.push(ingredient);
          this.ingredientes.sort((a, b) => a.name.localeCompare(b.name));
        });
      })
    });
  }
}
