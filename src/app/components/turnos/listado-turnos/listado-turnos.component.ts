import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { accionTurno } from 'src/app/Entities/accion-turno';
import { Turno } from 'src/app/Entities/turno';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})
export class ListadoTurnosComponent implements OnInit, OnChanges {

  @Input() turnos? : Turno[];

  @Output() accionDisparadaEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges() : void {

  }

  onAccion(accion : accionTurno, turno : Turno){
    this.accionDisparadaEvent.emit({accion, turno});
  }
}
