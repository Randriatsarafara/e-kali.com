import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatLivreurComponent } from './plat-livreur.component';

describe('PlatLivreurComponent', () => {
  let component: PlatLivreurComponent;
  let fixture: ComponentFixture<PlatLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
