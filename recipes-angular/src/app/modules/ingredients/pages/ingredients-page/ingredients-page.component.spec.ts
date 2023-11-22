import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientsPageComponent } from './ingredients-page.component';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { of } from 'rxjs';
import { Recipe } from 'src/app/core/models/recipe.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IngredientsPageComponent', () => {
  let component: IngredientsPageComponent;
  let fixture: ComponentFixture<IngredientsPageComponent>;
  let recipeService: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsPageComponent],
      providers: [RecipeService],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(IngredientsPageComponent);
    component = fixture.componentInstance;
    recipeService = TestBed.inject(RecipeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all recipes and update ingredients list', () => {
    // Arrange
    const mockRecipes: Recipe[] = [
        { _id: '1', name: 'Lechuga 1', description: 'Description 1', imagePath: 'www.example.com/image1', ingredients: [{ name: 'Ingredient 1', amount: 15 }] },
        { _id: '2', name: 'Lechuga 2', description: 'Description 2', imagePath: 'www.example.com/image2', ingredients: [{ name: 'Ingredient 2', amount: 5 }] },
        { _id: '3', name: 'Lechuga 3', description: 'Description 3', imagePath: 'www.example.com/image3', ingredients: [{ name: 'Ingredient 3', amount: 8 }] },
      ];

    spyOn(recipeService, 'getAllRecips').and.returnValue(of(mockRecipes));

    // Act
    component.ngOnInit();

    // Assert
    expect(recipeService.getAllRecips).toHaveBeenCalled();
    expect(component.ingredientes).toEqual([
      { name: 'Ingredient 1', amount: 15 },
      { name: 'Ingredient 2', amount: 5 },
      { name: 'Ingredient 3', amount: 8 }
    ]);
  });
});