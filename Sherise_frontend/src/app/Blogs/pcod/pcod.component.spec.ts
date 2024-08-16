import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcodComponent } from './pcod.component';

describe('PcodComponent', () => {
  let component: PcodComponent;
  let fixture: ComponentFixture<PcodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PcodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
