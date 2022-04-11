import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficerestaurantComponent } from './beneficerestaurant.component';

describe('BeneficerestaurantComponent', () => {
  let component: BeneficerestaurantComponent;
  let fixture: ComponentFixture<BeneficerestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficerestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficerestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
