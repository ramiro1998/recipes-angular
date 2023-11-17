import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  recipes: Recipe[] = []/* [{ _id: '1', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '2', name: 'receta2', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '3', name: 'receta3', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '4', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '5', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '6', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '7', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }] */
  showModal: boolean = false
  recipeForm!: FormGroup
  p: number = 1

  constructor(private route: Router, private fb: FormBuilder, private recipeSercvice: RecipeService, private alertService: AlertsService) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
    });
    this.alertService.loading()
    this.getRecipes()
  }

  getRecipes() {
    this.recipeSercvice.getAllRecips().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
      Swal.close()
    })
  }

  goIndividualRecipe() {
    this.route.navigate([`/recipe/noid`])
  }

  searchRecipes(value: any) {
    this.recipeSercvice.getAllRecips().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
      Swal.close()
    })
  }

}
