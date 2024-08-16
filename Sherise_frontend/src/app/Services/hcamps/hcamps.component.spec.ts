import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcampsComponent } from './hcamps.component';

describe('HcampsComponent', () => {
  let component: HcampsComponent;
  let fixture: ComponentFixture<HcampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HcampsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
