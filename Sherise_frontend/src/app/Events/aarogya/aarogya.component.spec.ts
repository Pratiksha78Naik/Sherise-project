import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AarogyaComponent } from './aarogya.component';

describe('AarogyaComponent', () => {
  let component: AarogyaComponent;
  let fixture: ComponentFixture<AarogyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AarogyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AarogyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
