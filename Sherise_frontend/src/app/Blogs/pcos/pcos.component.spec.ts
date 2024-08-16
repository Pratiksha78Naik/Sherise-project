import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcosComponent } from './pcos.component';

describe('PcosComponent', () => {
  let component: PcosComponent;
  let fixture: ComponentFixture<PcosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PcosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
