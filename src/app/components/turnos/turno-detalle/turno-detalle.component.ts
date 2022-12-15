import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Profesional } from 'src/app/Entities/profesional';
import { Turno } from 'src/app/Entities/turno';
import { UserFactory } from 'src/app/Entities/user-factory';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.scss']
})
export class TurnoDetalleComponent implements OnInit, OnChanges {

  @Input() turno! : Turno;
  profesional? : Profesional;

  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsuario(this.turno.idProfesional).subscribe(p=> this.profesional = UserFactory.constructUser(p.data()));
  }

  ngOnChanges(){
  }
}
