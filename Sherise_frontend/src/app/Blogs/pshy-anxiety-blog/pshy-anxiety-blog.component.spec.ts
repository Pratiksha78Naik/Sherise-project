import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PshyAnxietyBlogComponent } from './pshy-anxiety-blog.component';

describe('PshyAnxietyBlogComponent', () => {
  let component: PshyAnxietyBlogComponent;
  let fixture: ComponentFixture<PshyAnxietyBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PshyAnxietyBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PshyAnxietyBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
