import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/core/models/recipe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-individual-recipe',
  templateUrl: './individual-recipe.component.html',
  styleUrls: ['./individual-recipe.component.css']
})
export class IndividualRecipeComponent implements OnInit {


  recipes: Recipe[] = [{ _id: '1', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '2', name: 'receta2', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '3', name: 'receta3', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '4', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '5', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '6', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }, { _id: '7', name: 'receta1', description: 'descripcion', imagePath: 'wwww.google.com' }]
  recipe!: Recipe;
  formRecipe!: FormGroup

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.formRecipe = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.recipe = this.recipes.filter(recipe => recipe._id == this.route.snapshot.paramMap.get('id'))[0]
    console.log('entering', this.recipe)

    this.formRecipe.patchValue({
      name: this.recipe.name,
      description: this.recipe.description,
      imagePath: this.recipe.imagePath,
    });
    this.formRecipe.disable();
  }


  editRecipe(recipe: Recipe) {
    this.formRecipe.enable();
  }

  deleteRecipe(recipe: Recipe) {
    Swal.fire({
      title: `¿Está seguro que quiere eliminar la receta ${recipe.name}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      customClass: {
        popup: 'sweet-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // this.configService.deleteTrack$(track._id).subscribe(() => {
          Swal.fire({
            title: "Receta eliminada!",
            icon: "success",
            customClass: {
              popup: 'sweet-popup'
            }
          });
        //   this.getAllTracks()
        // }
          // , (error: any) => {
          //   Swal.fire({
          //     title: "Error al eliminar",
          //     icon: "error",
          //     customClass: {
          //       popup: 'sweet-popup'
          //     }
          //   });
          // })
      }
    });
  }

  submitForm() {

  }
}
