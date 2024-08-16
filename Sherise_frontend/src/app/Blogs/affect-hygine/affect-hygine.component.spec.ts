import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectHygineComponent } from './affect-hygine.component';

describe('AffectHygineComponent', () => {
  let component: AffectHygineComponent;
  let fixture: ComponentFixture<AffectHygineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AffectHygineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AffectHygineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
