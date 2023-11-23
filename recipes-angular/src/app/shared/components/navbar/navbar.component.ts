import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth-service.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navMenu: Array<any> = [];

  constructor(private router: Router, private authService: AuthService, private favoriteService: FavoritesService) { }

  ngOnInit(): void {

    this.navMenu = [
      {
        name: 'Home',
        router: ['/'],
      },
      {
        name: 'Ingredientes',
        router: ['/', 'ingredients'],
      }
    ]
  }


  logout() {
    this.authService.logout()
  }

  resetFavorites(){
    this.favoriteService.falseFavorites()
  }
}
