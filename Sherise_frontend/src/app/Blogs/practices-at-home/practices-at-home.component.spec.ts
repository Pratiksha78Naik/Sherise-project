import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticesAtHomeComponent } from './practices-at-home.component';

describe('PracticesAtHomeComponent', () => {
  let component: PracticesAtHomeComponent;
  let fixture: ComponentFixture<PracticesAtHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticesAtHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticesAtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
