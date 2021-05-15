import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContenidoComponent } from './navigation-contenido.component';

describe('NavigationContenidoComponent', () => {
  let component: NavigationContenidoComponent;
  let fixture: ComponentFixture<NavigationContenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationContenidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
