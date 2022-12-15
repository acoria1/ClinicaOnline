import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Feature } from 'src/app/classes/feature';
import { WeekDay } from 'src/app/classes/weekDay';
import { Profesional } from 'src/app/Entities/profesional';
import { TimeHandler } from 'src/app/Entities/time-handler';
import { Turno } from 'src/app/Entities/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-seleccionar-turno',
  templateUrl: './seleccionar-turno.component.html',
  styleUrls: ['./seleccionar-turno.component.scss']
})
export class SeleccionarTurnoComponent implements OnInit, OnChanges {

  @Input() profesional! : Profesional;
  @Input() especialidad! : string;
  @Input() fecha : WeekDay = { fecha : TimeHandler.formatDate(new Date()), dia : TimeHandler.getDayDescription(new Date())};

  @Output() turnoSeleccionadoEvent = new EventEmitter<Turno>();

  turnos : Turno[] = [];
  turnoButtons : Feature[] = [];
  turnoSeleccionado? : Turno;

  constructor(private turnosService : TurnosService) { }
  
  ngOnInit(): void {
    this.turnosService.currentTurnosNoDisponibles(this.profesional.uid!,this.fecha.fecha).subscribe(()=>{
      this.setTurnos();
    })
    // this.setTurnos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTurnos();
  }

  setTurnos(){
    this.turnoButtons.length = 0;
    this.turnos.length = 0;
    this.getTurnos()
    .then(turnos => {
      turnos.forEach((t,i) => {
        this.agregarTurno(t, i.toString());
      });
    })
  }

  async getTurnos() : Promise<Turno[]>{
    let turnosExistentes : Turno[] = await this.turnosService.getTurnosNoDisponibles(this.profesional.uid!, this.fecha.fecha);
    let turnosDisponibles = this.constructTurnosDelDia()
    .filter(turno => {
      return turnosExistentes.find(existente => existente.inicia == turno.inicia) == undefined
    })
    return new Promise((res) => {
      res(turnosDisponibles);
    });
  }

  constructTurnosDelDia(){
    return this.profesional?.constructTurnos(new Date(),15)
    .filter(x => 
      x.especialidad.toLowerCase() == this.especialidad.toLowerCase() &&
      x.fecha == this.fecha.fecha
    )
  }

  agregarTurno(turno : Turno, id : string ){
    this.turnos.push(turno);
      this.turnoButtons.push({
        id : id,
        color : 'black',
        label : `${turno.inicia} - ${turno.finaliza}`,
        backgroundImg : '',
        backgroundColor : '#d4d4ff'
      })
  }

  onTurnoSeleccionado(turnoBtn : Feature){
    this.turnoSeleccionado = this.turnos[parseInt(turnoBtn.id)];
    this.turnoSeleccionadoEvent.emit(this.turnoSeleccionado);
  }

}
