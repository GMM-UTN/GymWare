import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaClienteComponent } from './dieta-cliente.component';

describe('DietaClienteComponent', () => {
  let component: DietaClienteComponent;
  let fixture: ComponentFixture<DietaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
