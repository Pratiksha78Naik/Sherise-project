import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KagajpadComponent } from './kagajpad.component';

describe('KagajpadComponent', () => {
  let component: KagajpadComponent;
  let fixture: ComponentFixture<KagajpadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KagajpadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KagajpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
