import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  editMode: boolean = false
  newRecipeBoolean: boolean = false
  formsubmitted: boolean = false

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private recipeService: RecipeService, private alertService: AlertsService, private router: Router) {
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
      const existId = this.route.snapshot.paramMap.get('id');
      if (existId && existId != 'noid') {
        this.loadForm()
        this.newRecipeBoolean = false
      } else {
        this.newRecipeBoolean = true
        Swal.close();
      }
    } catch (error) {
    }
  }

  loadForm() {
    this.recipeService.getAllRecips().subscribe((recipes) => {
      this.recipes = recipes;
      this.recipe = this.recipes.filter((recipe) => recipe._id === this.route.snapshot.paramMap.get('id'))[0];

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
  }

  editRecipe(recipe: Recipe) {
    this.formRecipe.enable();
    this.editMode = true
  }

  deleteRecipe(recipe: Recipe) {
    this.alertService.deleteAlert(recipe.name, 'receta').subscribe((confirmed) => {
      if (confirmed) {
        this.recipeService.deleteRecipe(this.route.snapshot.paramMap.get('id') as string).subscribe(() => {
          this.alertService.createDeleteAlert('receta', 'eliminada')
          setTimeout(() => {
            this.router.navigate([`/`])
          }, 1000);
        }, error => this.alertService.errorAlert(recipe.name))
      }
    });
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

  removeIngredient(index: number, ingredient: any) {
    this.alertService.deleteAlert(ingredient.get('name').value, 'ingrediente').subscribe((confirmed) => {
      if (confirmed) {
        const ingredientsFormArray = this.getForm()
        ingredientsFormArray.removeAt(index);
      }
    });
  }

  cancelSave() {
    this.alertService.loading()
    this.editMode = false
    this.formRecipe.reset()
    this.loadForm()
  }

  getErrorMessage(control: any): string {
    if (control.touched || this.formsubmitted) {
      if (control.errors?.required) {
        return 'Campo requerido';
      }

      if (control instanceof FormArray) {
        if (control.length == 0) return 'Debe agregar al menos un ingrediente'
        for (let i = 0; i < control.controls.length; i++) {
          const ingredientGroup = control.controls[i] as FormGroup;
          if (ingredientGroup.controls['name'].errors || ingredientGroup.controls['amount'].errors) {
            return 'Hay errores en los ingredientes';
          }
        }
      }
    }
    return '';
  }

  saveRecipe() {
    this.formsubmitted = true
    if (this.formRecipe.valid) {
      if (this.newRecipeBoolean) {
        const recipeId = this.route.snapshot.paramMap.get('id');
        const recipeData = this.formRecipe.value;
        this.recipeService.newRecipe(recipeData).subscribe((recipeCreated: Recipe) => {
          this.alertService.createDeleteAlert('receta', 'creada')
          setTimeout(() => {
            this.router.navigate([`/`])
          }, 1000);
        }, error => {
          this.alertService.errorAlert('receta')
        })
      } else {
        const recipeId = this.route.snapshot.paramMap.get('id');
        const recipeData = this.formRecipe.value;
        this.recipeService.editRecipe(recipeData, recipeId as string).subscribe((recipeEdited: Recipe) => {
          this.alertService.createDeleteAlert('receta', 'editada')
          this.editMode = false
          this.formRecipe.disable()
        }, error => {
          this.alertService.errorAlert('receta')
        })
      }
    } else {
      this.alertService.errorAlert('receta')
    }
  }

  submitForm() {

  }
}
