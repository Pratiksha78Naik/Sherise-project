import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PshyAnemiaBlogComponent } from './pshy-anemia-blog.component';

describe('PshyAnemiaBlogComponent', () => {
  let component: PshyAnemiaBlogComponent;
  let fixture: ComponentFixture<PshyAnemiaBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PshyAnemiaBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PshyAnemiaBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
