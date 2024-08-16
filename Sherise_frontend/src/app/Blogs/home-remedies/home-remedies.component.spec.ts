import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRemediesComponent } from './home-remedies.component';

describe('HomeRemediesComponent', () => {
  let component: HomeRemediesComponent;
  let fixture: ComponentFixture<HomeRemediesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRemediesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeRemediesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
