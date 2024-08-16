import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MquizComponent } from './mquiz.component';

describe('MquizComponent', () => {
  let component: MquizComponent;
  let fixture: ComponentFixture<MquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MquizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
