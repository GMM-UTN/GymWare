import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEjercicioComponent } from './edit-ejercicio.component';

describe('EditEjercicioComponent', () => {
  let component: EditEjercicioComponent;
  let fixture: ComponentFixture<EditEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
