import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplatComponent } from './newplat.component';

describe('NewplatComponent', () => {
  let component: NewplatComponent;
  let fixture: ComponentFixture<NewplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
