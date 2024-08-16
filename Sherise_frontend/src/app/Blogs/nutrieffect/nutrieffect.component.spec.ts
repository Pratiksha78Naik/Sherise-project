import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrieffectComponent } from './nutrieffect.component';

describe('NutrieffectComponent', () => {
  let component: NutrieffectComponent;
  let fixture: ComponentFixture<NutrieffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutrieffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutrieffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
