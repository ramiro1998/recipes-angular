import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomePageComponent } from './home-page.component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { LengthDescriptionPipe } from 'src/app/shared/pipes/length-description.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, SearchBarComponent, LengthDescriptionPipe], imports: [HttpClientTestingModule, NgxPaginationModule]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
