import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbRutinaComponent } from './amb-rutina.component';

describe('AmbRutinaComponent', () => {
  let component: AmbRutinaComponent;
  let fixture: ComponentFixture<AmbRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
