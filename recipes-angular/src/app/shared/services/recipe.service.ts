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
    return this.http.get(`${this.URL}/api/recipes/get?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAyMzIwMTIsImV4cCI6MTcwMDI0NjQxMn0.pHihBfamyRUzfSYMzhJ4H56mMcJXuXKB4-1P0o-rRok`)
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
    return this.http.post(`${this.URL}/api/recipes/add?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAyMzIwMTIsImV4cCI6MTcwMDI0NjQxMn0.pHihBfamyRUzfSYMzhJ4H56mMcJXuXKB4-1P0o-rRok`, recipe)
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

  editRecipe(recipe: Recipe, id: string): Observable<Recipe> {
    return this.http.put(`${this.URL}/api/recipes/edit/${id}?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAyMzIwMTIsImV4cCI6MTcwMDI0NjQxMn0.pHihBfamyRUzfSYMzhJ4H56mMcJXuXKB4-1P0o-rRok`, recipe)
      .pipe(
        map((recipe: any) => {
          return recipe
        }),
        catchError((error: any) => {
          console.log('Error editing recipe:', error);
          return throwError(error);
        })
      )
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete(`${this.URL}/api/recipes/delete/${id}?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAyMzIwMTIsImV4cCI6MTcwMDI0NjQxMn0.pHihBfamyRUzfSYMzhJ4H56mMcJXuXKB4-1P0o-rRok`)
      .pipe(
        map((recipe: any) => {
          return recipe
        }),
        catchError((error: any) => {
          console.log('Error deleting recipe:', error);
          return throwError(error);
        })
      )
  }

}
