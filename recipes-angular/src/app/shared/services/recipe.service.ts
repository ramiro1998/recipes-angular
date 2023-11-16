import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private URL: string = environment.api

  constructor(private http: HttpClient) { }


  getAllRecips(): Observable<Recipe[]> {
    return this.http.get(`${this.URL}/api/recipes/get?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAxMzg2NzgsImV4cCI6MTcwMDE1MzA3OH0.jlo0MfNvHZQEn6hQSrdVMebgF0MLR7oZKiUMOEpiKUs`)
      .pipe(
        map((recipes: any) => {
          return recipes
        }),
        catchError((error: any) => {
          console.log('Error getting recipes:', error);
          return throwError(error);
        })
      )
  }

  newRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post(`${this.URL}/api/recipes/add?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAxNDUxOTgsImV4cCI6MTcwMDE1OTU5OH0.D-y5f2UNDvNOSaCEml8ZVqOqm-8VdsdHxERphHIvw4s`, recipe)
      .pipe(
        map((recipe: any) => {
          console.log('recipe service', recipe)
          return recipe
        }),
        catchError((error: any) => {
          console.log('Error creating recipe:', error);
          return throwError(error);
        })
      )
  }

  editRecipe(recipe: Recipe, id: string): Observable<Recipe> {
    return this.http.put(`${this.URL}/api/recipes/edit/${id}?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAxNDUxOTgsImV4cCI6MTcwMDE1OTU5OH0.D-y5f2UNDvNOSaCEml8ZVqOqm-8VdsdHxERphHIvw4s`, recipe)
      .pipe(
        map((recipe: any) => {
          return recipe
        }),
        catchError((error: any) => {
          console.log('Error creating recipe:', error);
          return throwError(error);
        })
      )
  }

}
