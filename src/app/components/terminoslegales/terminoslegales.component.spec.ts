import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminoslegalesComponent } from './terminoslegales.component';

describe('TerminoslegalesComponent', () => {
  let component: TerminoslegalesComponent;
  let fixture: ComponentFixture<TerminoslegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminoslegalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminoslegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
