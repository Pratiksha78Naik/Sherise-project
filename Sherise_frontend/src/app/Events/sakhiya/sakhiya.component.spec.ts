import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SakhiyaComponent } from './sakhiya.component';

describe('SakhiyaComponent', () => {
  let component: SakhiyaComponent;
  let fixture: ComponentFixture<SakhiyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SakhiyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SakhiyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
