import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe.model';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private URL: string = environment.api

  constructor(private http: HttpClient, private cookie:CookieService) { }

  // token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAxNTUzMDEsImV4cCI6MTcwMDE2OTcwMX0.qtc4LHWp3uR_z_J1WFMZPoQ0Il1mBLSwKcWkH4apv1A";
  token:string = this.cookie.get('recipesToken');

  getAllRecips(): Observable<Recipe[]> {
    return this.http.get(`${this.URL}/api/recipes/get?auth=${this.token}`)
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
    return this.http.post(`${this.URL}/api/recipes/add?auth=${this.token}`, recipe)
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
    return this.http.put(`${this.URL}/api/recipes/edit/${id}?auth=${this.token}`, recipe)
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
