import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifplatComponent } from './modifplat.component';

describe('ModifplatComponent', () => {
  let component: ModifplatComponent;
  let fixture: ComponentFixture<ModifplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifplatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
