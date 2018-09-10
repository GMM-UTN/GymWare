import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComidaComponent } from './edit-comida.component';

describe('EditComidaComponent', () => {
  let component: EditComidaComponent;
  let fixture: ComponentFixture<EditComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
