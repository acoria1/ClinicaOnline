import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaDetalleComponent } from './resenia-detalle.component';

describe('ReseniaDetalleComponent', () => {
  let component: ReseniaDetalleComponent;
  let fixture: ComponentFixture<ReseniaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseniaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReseniaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
