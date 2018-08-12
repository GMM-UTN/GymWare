import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEjercicioComponent } from './alta-ejercicio.component';

describe('AltaEjercicioComponent', () => {
  let component: AltaEjercicioComponent;
  let fixture: ComponentFixture<AltaEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
