import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAltaRutinaComponent } from './formulario-alta-rutina.component';

describe('FormularioAltaRutinaComponent', () => {
  let component: FormularioAltaRutinaComponent;
  let fixture: ComponentFixture<FormularioAltaRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAltaRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAltaRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
