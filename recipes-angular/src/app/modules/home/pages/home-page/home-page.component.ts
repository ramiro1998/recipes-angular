import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  showModal: boolean = false
  recipeForm!: FormGroup
  p: number = 1

  constructor(private route: Router, private fb: FormBuilder, public recipeService: RecipeService, private alertService: AlertsService, public favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
    });
    this.alertService.loading()
    this.getRecipes()
    this.favoriteService.getFavoritesSubject().subscribe((value: boolean) => {
      this.checkLikedRecipes()
    });
  }

  getRecipes() {
    this.recipeService.getAllRecips().subscribe((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes)
      Swal.close()
    })
  }

  goIndividualRecipe() {
    this.route.navigate([`/recipe/noid`])
  }

  searchRecipes(value: any) {
    if (!this.favoriteService.getFavorites()) {
      this.recipeService.getAllRecips().subscribe((recipes: Recipe[]) => {
        const recipeToSet = recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        this.recipeService.setRecipes(recipeToSet)
        Swal.close()
      })
    } else {
      this.recipeService.getAllRecips().subscribe((recipes: Recipe[]) => {
        const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') ?? '[]');
        const recipeToSet = recipes.filter(recipe => likedRecipes.includes(recipe._id) && recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        this.recipeService.setRecipes(recipeToSet)
      })
    }
  }

  favoritesRecipes() {
    this.favoriteService.toggleFavorites()
    this.checkLikedRecipes();
    this.p = 1
  }

  checkLikedRecipes() {
    if (this.favoriteService.getFavorites()) {
      const likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') ?? '[]');
      let recipes = this.recipeService.getRecipes()
      recipes = recipes.filter(recipe => likedRecipes.includes(recipe._id))
      this.recipeService.setRecipes(recipes)
    } else {
      this.getRecipes()
    }

  }

}
