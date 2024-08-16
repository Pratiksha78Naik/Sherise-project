import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenstrualMythsComponent } from './menstrual-myths.component';

describe('MenstrualMythsComponent', () => {
  let component: MenstrualMythsComponent;
  let fixture: ComponentFixture<MenstrualMythsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenstrualMythsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenstrualMythsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
