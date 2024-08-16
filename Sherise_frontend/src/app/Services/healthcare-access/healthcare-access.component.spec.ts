import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareAccessComponent } from './healthcare-access.component';

describe('HealthcareAccessComponent', () => {
  let component: HealthcareAccessComponent;
  let fixture: ComponentFixture<HealthcareAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthcareAccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthcareAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
