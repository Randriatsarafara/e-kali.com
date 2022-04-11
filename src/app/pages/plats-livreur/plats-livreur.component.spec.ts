import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsLivreurComponent } from './plats-livreur.component';

describe('PlatsLivreurComponent', () => {
  let component: PlatsLivreurComponent;
  let fixture: ComponentFixture<PlatsLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatsLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
