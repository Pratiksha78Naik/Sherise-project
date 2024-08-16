import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdaanComponent } from './udaan.component';

describe('UdaanComponent', () => {
  let component: UdaanComponent;
  let fixture: ComponentFixture<UdaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UdaanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
