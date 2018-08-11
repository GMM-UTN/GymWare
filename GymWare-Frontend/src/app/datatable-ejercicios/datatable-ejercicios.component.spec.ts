import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableEjerciciosComponent } from './datatable-ejercicios.component';

describe('DatatableEjerciciosComponent', () => {
  let component: DatatableEjerciciosComponent;
  let fixture: ComponentFixture<DatatableEjerciciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableEjerciciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
