import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEstadoTurnoComponent } from './modificar-estado-turno.component';

describe('ModificarEstadoTurnoComponent', () => {
  let component: ModificarEstadoTurnoComponent;
  let fixture: ComponentFixture<ModificarEstadoTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEstadoTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEstadoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
