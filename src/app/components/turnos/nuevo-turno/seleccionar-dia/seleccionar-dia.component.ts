import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Feature } from 'src/app/classes/feature';
import { WeekDay } from 'src/app/classes/weekDay';
import { Profesional } from 'src/app/Entities/profesional';
import { TimeHandler } from 'src/app/Entities/time-handler';

@Component({
  selector: 'app-seleccionar-dia',
  templateUrl: './seleccionar-dia.component.html',
  styleUrls: ['./seleccionar-dia.component.scss']
})
export class SeleccionarDiaComponent implements OnInit, OnChanges {

  @Input() profesional! : Profesional;
  @Input() especialidad! : string;

  @Output() fechaSeleccionadaEvent = new EventEmitter<WeekDay>();

  fechas : WeekDay[] = [];
  fechaButtons : Feature[] = [];
  fechaSeleccionada? : WeekDay;
  uniqueDays? : number;

  constructor() { }
  
  ngOnInit(): void {
    this.setFechas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFechas();
  }

  setFechas(){
    this.fechaButtons.length = 0;
    this.fechas.length = 0;
    this.profesional?.constructDias(this.especialidad, 15)
    .forEach((d,i) => {
      this.fechas.push(d);
      this.fechaButtons.push({
        id : i.toString(),
        color : 'black',
        label : 
        `${d.dia}  ${TimeHandler.reverseDateString(d.fecha)}`,
        backgroundImg : '',
        backgroundColor : '#d4d4ff'
      })
    });
    this.uniqueDays = this.getUniqueDays();
  }

  getUniqueDays(){
    return this.fechas
    .map(f => f.dia)
    .filter((item,index,arr) => arr.indexOf(item) === index)
    .length;
  }

  onFechaSeleccionada(fechaBtn : Feature){
    this.fechaSeleccionada = this.fechas[parseInt(fechaBtn.id)];
    this.fechaSeleccionadaEvent.emit(this.fechaSeleccionada);
  }

}
