import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
<<<<<<< Updated upstream
export class HomePageComponent {
=======

export class HomePageComponent implements OnInit {
>>>>>>> Stashed changes

  recipes: Recipe[] = []/* [{ _id: '1', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '2', name: 'receta2', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '3', name: 'receta3', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '4', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '5', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '6', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '7', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }] */

  constructor(private route: Router, private recipeSercvice: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes()
  }

  getRecipes() {
    this.recipeSercvice.getAllRecips().subscribe((recipes: Recipe[]) => {
      console.log('datiñoss', recipes)
      this.recipes = recipes
    })
  }

  goIndividualRecipe(recipe: Recipe) {
    this.route.navigate([`/recipe/${recipe._id}`])
  }
}
