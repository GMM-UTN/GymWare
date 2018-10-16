import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAsistenciaComponent } from './cliente-asistencia.component';

describe('ClienteAsistenciaComponent', () => {
  let component: ClienteAsistenciaComponent;
  let fixture: ComponentFixture<ClienteAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
