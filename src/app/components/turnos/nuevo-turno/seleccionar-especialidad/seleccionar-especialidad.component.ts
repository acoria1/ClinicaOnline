import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Feature } from 'src/app/classes/feature';
import { Profesional } from 'src/app/Entities/profesional';

@Component({
  selector: 'app-seleccionar-especialidad',
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrls: ['./seleccionar-especialidad.component.scss']
})
export class SeleccionarEspecialidadComponent implements OnInit, OnChanges {

  @Input() profesional! : Profesional;
  @Output() especialidadSeleccionadaEvent = new EventEmitter<string>();
  especialidadesButtons : Feature[] = [];

  constructor() { }
  

  ngOnInit(): void {
    this.setEspecialidades();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setEspecialidades();
  }

  setEspecialidades(){
    this.especialidadesButtons.length = 0;
    this.profesional?.especialidadesAsArray.forEach(e => {
      this.especialidadesButtons.push({
        id : e,
        color : 'black',
        label : e.toUpperCase(),
        backgroundImg : 'https://cdn.icon-icons.com/icons2/795/PNG/512/1-25_icon-icons.com_65706.png',
        backgroundColor : ''
      })
    });
  }

  onEspecialidadSeleccionada(especialidadBtn : Feature){
    this.especialidadSeleccionadaEvent.emit(especialidadBtn.id);
  }

}
