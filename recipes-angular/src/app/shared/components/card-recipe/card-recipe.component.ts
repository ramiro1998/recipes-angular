import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: ['./card-recipe.component.css']
})
export class CardRecipeComponent implements OnInit {
  @Input() recipe!: Recipe
  isLiked: boolean = false

  constructor(private route: Router, private recipeService: RecipeService, private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.checkLikedRecipes()
  }

  checkLikedRecipes() {
    const likedRecipes: any[] = JSON.parse(localStorage.getItem('likedRecipes') || '[]');
    const index = likedRecipes.findIndex((likedRecipe: any) => likedRecipe === this.recipe._id);
    const recipeToRemove = this.recipeService.getRecipes().find((recipe: any) => recipe._id === this.recipe._id);
    if (index !== -1) {
      this.isLiked = true
    } else {
      if (this.favoriteService.getFavorites()) {
        const recipes = this.recipeService.getRecipes().filter(recipe => recipe._id != recipeToRemove?._id)
        this.recipeService.setRecipes(recipes)
      }
      this.isLiked = false
    }
  }

  goIndividualRecipe(recipe: Recipe) {
    this.route.navigate([`/recipe/${recipe._id}`])
  }

  async likeRecipe(recipe: Recipe) {
    await this.recipeService.likeRecipe(recipe);
    this.checkLikedRecipes();
  }
}
