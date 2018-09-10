import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaComidaComponent } from './alta-comida.component';

describe('AltaComidaComponent', () => {
  let component: AltaComidaComponent;
  let fixture: ComponentFixture<AltaComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
