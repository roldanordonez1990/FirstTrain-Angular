import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUserComponent } from './modifica-user.component';

describe('ModificaUserComponent', () => {
  let component: ModificaUserComponent;
  let fixture: ComponentFixture<ModificaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
