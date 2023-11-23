import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: boolean = false;
  private favoritesSubject = new BehaviorSubject<boolean>(this.favorites);

  getFavorites() {
    return this.favorites;
  }

  falseFavorites() {
    this.favorites = false;
    this.favoritesSubject.next(this.favorites);
  }

  toggleFavorites() {
    this.favorites = !this.favorites;
    this.favoritesSubject.next(this.favorites);
  }

  getFavoritesSubject() {
    return this.favoritesSubject.asObservable();
  }
}