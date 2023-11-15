import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IndividualRecipeComponent } from './pages/individual-recipe/individual-recipe.component';

const routes: Routes = [
  {
    path: 'home', component: HomePageComponent
  },
  {
    path: 'recipe/:id', component: IndividualRecipeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'ingredients',
    loadChildren: () => import('../ingredients/ingredients.module').then(m => m.IngredientsModule)
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
