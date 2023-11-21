import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IndividualRecipeComponent } from './individual-recipe.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('IndividualRecipeComponent', () => {
  let component: IndividualRecipeComponent;
  let fixture: ComponentFixture<IndividualRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualRecipeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(IndividualRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
