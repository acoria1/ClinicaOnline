import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { accionTurno } from 'src/app/Entities/accion-turno';
import { Turno } from 'src/app/Entities/turno';
import { UserFactory } from 'src/app/Entities/user-factory';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modificar-estado-turno',
  templateUrl: './modificar-estado-turno.component.html',
  styleUrls: ['./modificar-estado-turno.component.scss']
})
export class ModificarEstadoTurnoComponent implements OnInit, OnChanges {

  @Input() turno! : Turno;
  tipoUsuario! : string;
  acciones! : accionTurno[];

  @Output() accionDisparadaEvent = new EventEmitter<accionTurno>();

  constructor(private usersService : UsersService) { 
  }

  ngOnInit(): void {
    this.getAcciones();
  }

  ngOnChanges(){
    this.getAcciones();
  }

  getAcciones(){
    this.tipoUsuario = this.usersService.getCurrentUser().typename;
    this.acciones = UserFactory.generateAcciones(this.turno.estado)
    .filter(accion => accion.permisos[this.tipoUsuario.toLowerCase()])
  }

  onAccionDisparada(accion : accionTurno){
    this.accionDisparadaEvent.emit(accion);
  }

}
