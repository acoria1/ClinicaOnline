import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaDetalleComponent } from './historia-clinica-detalle.component';

describe('HistoriaClinicaDetalleComponent', () => {
  let component: HistoriaClinicaDetalleComponent;
  let fixture: ComponentFixture<HistoriaClinicaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
