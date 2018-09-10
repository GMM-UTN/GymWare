import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDietaComponent } from './alta-dieta.component';

describe('AltaDietaComponent', () => {
  let component: AltaDietaComponent;
  let fixture: ComponentFixture<AltaDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
