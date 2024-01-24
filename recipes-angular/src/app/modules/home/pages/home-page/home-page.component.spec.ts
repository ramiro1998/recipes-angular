// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { HomePageComponent } from './home-page.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { RecipeService } from 'src/app/shared/services/recipe.service';
// import { AlertsService } from 'src/app/shared/services/alerts.service';
// import Swal from 'sweetalert2';
// import { of } from 'rxjs';
// import { SharedModule } from 'src/app/shared/shared.module';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { Recipe } from 'src/app/core/models/recipe.model';

// describe('HomePageComponent', () => {
//   let component: HomePageComponent;
//   let fixture: ComponentFixture<HomePageComponent>;
//   let recipeServiceSpy: jasmine.SpyObj<RecipeService>;
//   let alertsServiceSpy: jasmine.SpyObj<AlertsService>;

//   beforeEach(() => {
//     const spyRecipeService = jasmine.createSpyObj('RecipeService', ['getAllRecips']);
//     const spyAlertsService = jasmine.createSpyObj('AlertsService', ['loading']);

//     TestBed.configureTestingModule({
//       declarations: [HomePageComponent],
//       imports: [RouterTestingModule, ReactiveFormsModule, SharedModule, NgxPaginationModule],
//       providers: [
//         { provide: RecipeService, useValue: spyRecipeService },
//         { provide: AlertsService, useValue: spyAlertsService },
//         FormBuilder,
//       ],
//     });

//     recipeServiceSpy = TestBed.inject(RecipeService) as jasmine.SpyObj<RecipeService>;
//     alertsServiceSpy = TestBed.inject(AlertsService) as jasmine.SpyObj<AlertsService>;

//     fixture = TestBed.createComponent(HomePageComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize recipeForm and call getRecipes, loading on ngOnInit', () => {
//     // Arrange
//     spyOn(component, 'getRecipes');

//     // Act
//     component.ngOnInit();

//     // Assert
//     expect(component.recipeForm).toBeDefined();
//     expect(alertsServiceSpy.loading).toHaveBeenCalled();
//     expect(component.getRecipes).toHaveBeenCalled();
//   });

//   it('should call getRecipes and close loading on getRecipes', () => {
//     // Arrange
//     recipeServiceSpy.getAllRecips.and.returnValue(of([]));
//     spyOn(Swal, 'close');

//     // Act
//     component.getRecipes();

//     // Assert
//     expect(recipeServiceSpy.getAllRecips).toHaveBeenCalled();
//     expect(Swal.close).toHaveBeenCalled();
//   });

//   it('should update recipes based on search value', () => {
//     // Arrange
//     const searchValue = 'test';
//     const mockRecipes: Recipe[] = [
//       { _id: '1', name: 'Test Recipe 1', description: 'Description 1', imagePath: 'www.example.com/image1', ingredients: [{ name: 'Ingredient 1', amount: 15 }] },
//       { _id: '2', name: 'Test Recipe 2', description: 'Description 2', imagePath: 'www.example.com/image2', ingredients: [{ name: 'Ingredient 2', amount: 15 }] },
//       { _id: '3', name: 'Prueba Recipe 3', description: 'Description 3', imagePath: 'www.example.com/image3', ingredients: [{ name: 'Ingredient 3', amount: 15 }] },
//     ];

//     recipeServiceSpy.getAllRecips.and.returnValue(of(mockRecipes));

//     // Act
//     component.searchRecipes(searchValue);

//     // Assert
//     expect(recipeServiceSpy.getAllRecips).toHaveBeenCalled();

//     expect(component.recipes.length).toBe(2);
//   });

//   it('should handle no recipes after search', () => {
//     // Arrange
//     const searchValue = 'nonexistent';
//     const mockRecipes: Recipe[] = [
//       { _id: '1', name: 'Test Recipe 1', description: 'Description 1', imagePath: 'www.example.com/image1', ingredients: [{ name: 'Ingredient 4', amount: 15 }] },
//       { _id: '2', name: 'Test Recipe 2', description: 'Description 2', imagePath: 'www.example.com/image2', ingredients: [{ name: 'Ingredient 5', amount: 15 }] },
//       { _id: '3', name: 'Prueba Recipe 3', description: 'Description 3', imagePath: 'www.example.com/image3', ingredients: [{ name: 'Ingredient 6', amount: 15 }] },
//     ];

//     recipeServiceSpy.getAllRecips.and.returnValue(of(mockRecipes));

//     // Act
//     component.searchRecipes(searchValue);

//     // Assert
//     expect(recipeServiceSpy.getAllRecips).toHaveBeenCalled();
//     expect(component.recipes.length).toBe(0);
//   });



// });
