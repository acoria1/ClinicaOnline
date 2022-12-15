import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarProfesionalComponent } from './seleccionar-profesional.component';

describe('SeleccionarProfesionalComponent', () => {
  let component: SeleccionarProfesionalComponent;
  let fixture: ComponentFixture<SeleccionarProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarProfesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
