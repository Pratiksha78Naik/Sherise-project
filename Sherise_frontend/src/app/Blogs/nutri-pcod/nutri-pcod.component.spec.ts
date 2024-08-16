import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriPcodComponent } from './nutri-pcod.component';

describe('NutriPcodComponent', () => {
  let component: NutriPcodComponent;
  let fixture: ComponentFixture<NutriPcodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutriPcodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutriPcodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
