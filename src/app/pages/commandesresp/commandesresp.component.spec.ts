import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesrespComponent } from './commandesresp.component';

describe('CommandesrespComponent', () => {
  let component: CommandesrespComponent;
  let fixture: ComponentFixture<CommandesrespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesrespComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesrespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
