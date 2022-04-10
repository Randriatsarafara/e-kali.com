import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanderespComponent } from './commanderesp.component';

describe('CommanderespComponent', () => {
  let component: CommanderespComponent;
  let fixture: ComponentFixture<CommanderespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanderespComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanderespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
