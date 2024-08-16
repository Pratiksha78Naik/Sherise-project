import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NayidishaComponent } from './nayidisha.component';

describe('NayidishaComponent', () => {
  let component: NayidishaComponent;
  let fixture: ComponentFixture<NayidishaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NayidishaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NayidishaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
