import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PshyHormonesBlogComponent } from './pshy-hormones-blog.component';

describe('PshyHormonesBlogComponent', () => {
  let component: PshyHormonesBlogComponent;
  let fixture: ComponentFixture<PshyHormonesBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PshyHormonesBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PshyHormonesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
