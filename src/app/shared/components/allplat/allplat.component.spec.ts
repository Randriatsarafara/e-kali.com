import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllplatComponent } from './allplat.component';

describe('AllplatComponent', () => {
  let component: AllplatComponent;
  let fixture: ComponentFixture<AllplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
