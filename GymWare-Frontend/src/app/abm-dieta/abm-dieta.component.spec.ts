import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmDietaComponent } from './abm-dieta.component';

describe('AbmDietaComponent', () => {
  let component: AbmDietaComponent;
  let fixture: ComponentFixture<AbmDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
