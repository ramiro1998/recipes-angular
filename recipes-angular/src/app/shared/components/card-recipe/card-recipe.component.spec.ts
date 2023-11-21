import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardRecipeComponent } from './card-recipe.component';

describe('CardRecipeComponent', () => {
  let component: CardRecipeComponent;
  let fixture: ComponentFixture<CardRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRecipeComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CardRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
