import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-individual-recipe',
  templateUrl: './individual-recipe.component.html',
  styleUrls: ['./individual-recipe.component.css']
})
export class IndividualRecipeComponent implements OnInit {


  recipes: Recipe[] = []/* [{ _id: '1', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '2', name: 'receta2', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '3', name: 'receta3', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '4', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '5', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '6', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '7', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }] */
  recipe: Recipe = { _id: '', name: '', description: '', imagePath: '', ingredients: [] };
  formRecipe!: FormGroup

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private recipeService: RecipeService, private alertService: AlertsService) {
    this.formRecipe = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(45)]],
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
      ingredients: this.fb.array([])
    });
  }

  ngOnInit(): void {
    try {
      this.alertService.loading();
      this.recipeService.getAllRecips().subscribe((recipes) => {
        this.recipes = recipes;
        this.recipe = this.recipes.filter((recipe) => recipe._id === this.route.snapshot.paramMap.get('id'))[0];
        console.log('entering', this.recipe);
        console.log('recipes', this.recipes);

        if (Array.isArray(this.recipe.ingredients)) {
          const ingredientsFormArray = this.formRecipe.get('ingredients') as FormArray;
          ingredientsFormArray.clear();
          this.recipe.ingredients.forEach((ingredient: any) => {
            const ingredientGroup = this.fb.group({
              name: [ingredient.name, Validators.required],
              amount: [ingredient.amount, Validators.required],
            });
            ingredientsFormArray.push(ingredientGroup);
          });
        }

        this.formRecipe.patchValue({
          name: this.recipe.name,
          description: this.recipe.description,
          imagePath: this.recipe.imagePath,
        });

        this.formRecipe.disable();
        Swal.close();

      }, (error) => console.log('error', error));
    } catch (error) {
      console.log('erorrrrrr');
    }
  }


  editRecipe(recipe: Recipe) {
    this.formRecipe.enable();
  }

  deleteRecipe(recipe: Recipe) {
    this.alertService.deleteAlert(recipe.name, 'receta')
  }

  getForm() {
    return this.formRecipe.get('ingredients') as FormArray
  }

  addIngredient() {
    const ingredientsFormArray = this.getForm();
    const newIngredientGroup = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
    ingredientsFormArray.push(newIngredientGroup);
  }

  submitForm() {

  }
}
