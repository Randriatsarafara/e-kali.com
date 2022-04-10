import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesusersComponent } from './listesusers.component';

describe('ListesusersComponent', () => {
  let component: ListesusersComponent;
  let fixture: ComponentFixture<ListesusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
