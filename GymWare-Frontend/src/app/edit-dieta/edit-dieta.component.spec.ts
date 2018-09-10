import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDietaComponent } from './edit-dieta.component';

describe('EditDietaComponent', () => {
  let component: EditDietaComponent;
  let fixture: ComponentFixture<EditDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
