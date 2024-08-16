import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadbankComponent } from './padbank.component';

describe('PadbankComponent', () => {
  let component: PadbankComponent;
  let fixture: ComponentFixture<PadbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PadbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PadbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
