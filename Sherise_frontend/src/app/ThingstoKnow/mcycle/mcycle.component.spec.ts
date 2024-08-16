import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McycleComponent } from './mcycle.component';

describe('McycleComponent', () => {
  let component: McycleComponent;
  let fixture: ComponentFixture<McycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McycleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(McycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
