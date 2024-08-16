import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HygquizComponent } from './hygquiz.component';

describe('HygquizComponent', () => {
  let component: HygquizComponent;
  let fixture: ComponentFixture<HygquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HygquizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HygquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
