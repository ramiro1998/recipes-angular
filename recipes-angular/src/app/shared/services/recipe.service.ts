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
    return this.http.get(`${this.URL}/api/recipes/get?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTU0ZGE1YWY3NmJjZjcyYWUxZTNmMjEiLCJpYXQiOjE3MDAwNzQyMDgsImV4cCI6MTcwMDA4ODYwOH0.ZIZIaqO3uL4LIXg6c0w42zsITJ2VS9_vQF6tvH_hqlY`)
      .pipe(
        map((recipes: any) => {
          console.log('recipes service', recipes)
          return recipes
        }),
        catchError((error: any) => {
          console.log('Error getting recipes:', error);
          return throwError(error);
        })
      )
  }

}
