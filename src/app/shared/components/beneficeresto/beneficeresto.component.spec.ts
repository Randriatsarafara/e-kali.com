import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficerestoComponent } from './beneficeresto.component';

describe('BeneficerestoComponent', () => {
  let component: BeneficerestoComponent;
  let fixture: ComponentFixture<BeneficerestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficerestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficerestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
