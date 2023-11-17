import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';

@Pipe({
  name: 'lengthDescription'
})
export class LengthDescriptionPipe implements PipeTransform {

  transform(recipes: Recipe[], ...args: any[]): any {
    recipes.forEach((recipe: Recipe) => {
      if (recipe.description.length > 50) recipe.description = recipe.description.slice(0, 50) + '...'
    });
    return recipes;
  }

}
