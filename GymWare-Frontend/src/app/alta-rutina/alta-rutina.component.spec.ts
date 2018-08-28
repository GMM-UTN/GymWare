import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRutinaComponent } from './alta-rutina.component';

describe('AltaRutinaComponent', () => {
  let component: AltaRutinaComponent;
  let fixture: ComponentFixture<AltaRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
