import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeplatComponent } from './listeplat.component';

describe('ListeplatComponent', () => {
  let component: ListeplatComponent;
  let fixture: ComponentFixture<ListeplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
