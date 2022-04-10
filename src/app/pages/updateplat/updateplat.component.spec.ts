import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateplatComponent } from './updateplat.component';

describe('UpdateplatComponent', () => {
  let component: UpdateplatComponent;
  let fixture: ComponentFixture<UpdateplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
