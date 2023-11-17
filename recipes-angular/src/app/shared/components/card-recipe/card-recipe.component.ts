import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: ['./card-recipe.component.css']
})
export class CardRecipeComponent implements OnInit {
  @Input() recipe!: Recipe
  isLiked: boolean = false

  constructor(private route: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.checkLikedSongs()
  }

  checkLikedSongs() {
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');
    const index = likedSongs.findIndex((likedSong: any) => likedSong === this.recipe._id);
    if (index !== -1) {
      this.isLiked = true
    } else {
      this.isLiked = false
    }

  }

  goIndividualRecipe(recipe: Recipe) {
    this.route.navigate([`/recipe/${recipe._id}`])
  }

  async likeRecipe(recipe: Recipe) {
    await this.recipeService.likeSong(recipe);
    this.checkLikedSongs();
  }
}
