import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmClienteComponent } from './abm-cliente.component';

describe('AbmClienteComponent', () => {
  let component: AbmClienteComponent;
  let fixture: ComponentFixture<AbmClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
