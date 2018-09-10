import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmComidaComponent } from './abm-comida.component';

describe('AbmComidaComponent', () => {
  let component: AbmComidaComponent;
  let fixture: ComponentFixture<AbmComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
