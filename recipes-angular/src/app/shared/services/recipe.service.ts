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
  recipes!: Recipe[]

  constructor(private http: HttpClient, private cookie: CookieService) { }

  // token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAxNTUzMDEsImV4cCI6MTcwMDE2OTcwMX0.qtc4LHWp3uR_z_J1WFMZPoQ0Il1mBLSwKcWkH4apv1A";
  token: string = this.cookie.get('recipesToken');

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
          console.log('Error editing recipe:', error);
          return throwError(error);
        })
      )
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete(`${this.URL}/api/recipes/delete/${id}?auth=${this.token}`)
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

  likeRecipe(recipe: Recipe): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let likedRecipes: any[] = [];
      if (localStorage.getItem('likedRecipes')) {
        likedRecipes = JSON.parse(localStorage.getItem('likedRecipes') || '[]');
        const index = likedRecipes.findIndex((likedRecipe: any) => likedRecipe === recipe._id);
        if (index !== -1) {
          likedRecipes.splice(index, 1);
          resolve(false);
        } else {
          likedRecipes.push(recipe._id);
          resolve(true);
        }
        localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
      } else {
        likedRecipes.push(recipe._id);
        localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
        resolve(true);
      }
    });
  }

  getRecipes() {
    return this.recipes
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
  }

}
