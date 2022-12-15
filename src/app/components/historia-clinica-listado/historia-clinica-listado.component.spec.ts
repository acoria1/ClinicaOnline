import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaListadoComponent } from './historia-clinica-listado.component';

describe('HistoriaClinicaListadoComponent', () => {
  let component: HistoriaClinicaListadoComponent;
  let fixture: ComponentFixture<HistoriaClinicaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
