import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PshyComponent } from './pshy.component';

describe('PshyComponent', () => {
  let component: PshyComponent;
  let fixture: ComponentFixture<PshyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PshyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PshyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
