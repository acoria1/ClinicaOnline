import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Feature } from 'src/app/classes/feature';
import { Especialidad } from 'src/app/Entities/especialidad';
import { Profesional } from 'src/app/Entities/profesional';

@Component({
  selector: 'app-seleccionar-especialidad',
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrls: ['./seleccionar-especialidad.component.scss']
})
export class SeleccionarEspecialidadComponent implements OnInit, OnChanges {

  @Input() especialidades! : Especialidad[];
  @Input() columns : number = 2;
  @Input() rowHeight : string = '1:1';
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
    this.especialidades.forEach(e => {
      this.especialidadesButtons.push({
        id : e.descripcion,
        color : 'black',
        label : e.descripcion.toUpperCase(),
        backgroundImg : ((e.imagen !== undefined && e.imagen !== "") ? e.imagen : 'https://firebasestorage.googleapis.com/v0/b/clinica-online-ed9da.appspot.com/o/especialidad_default.png?alt=media&token=9eea795c-8e6e-4284-b4a3-818cf8b84d93'),
        backgroundColor : ''
      })
    });
  }

  onEspecialidadSeleccionada(especialidadBtn : Feature){
    this.especialidadSeleccionadaEvent.emit(especialidadBtn.id);
  }

}
