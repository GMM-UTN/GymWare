import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEjercicioComponent } from './abm-ejercicio.component';

describe('AbmEjercicioComponent', () => {
  let component: AbmEjercicioComponent;
  let fixture: ComponentFixture<AbmEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
