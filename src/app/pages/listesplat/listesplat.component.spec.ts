import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesplatComponent } from './listesplat.component';

describe('ListesplatComponent', () => {
  let component: ListesplatComponent;
  let fixture: ComponentFixture<ListesplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
