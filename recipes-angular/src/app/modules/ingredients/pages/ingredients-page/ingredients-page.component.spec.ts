import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IngredientsPageComponent } from './ingredients-page.component';

describe('IngredientsPageComponent', () => {
  let component: IngredientsPageComponent;
  let fixture: ComponentFixture<IngredientsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsPageComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(IngredientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
