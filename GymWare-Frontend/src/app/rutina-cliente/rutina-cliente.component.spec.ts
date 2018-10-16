import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaClienteComponent } from './rutina-cliente.component';

describe('RutinaClienteComponent', () => {
  let component: RutinaClienteComponent;
  let fixture: ComponentFixture<RutinaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
