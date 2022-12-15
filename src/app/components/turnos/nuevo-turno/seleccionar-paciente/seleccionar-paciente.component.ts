import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Paciente } from 'src/app/Entities/paciente';

@Component({
  selector: 'app-seleccionar-paciente',
  templateUrl: './seleccionar-paciente.component.html',
  styleUrls: ['./seleccionar-paciente.component.scss']
})
export class SeleccionarPacienteComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() pacientes? : Paciente[];
  @Output() pacienteSeleccionadoEvent = new EventEmitter<Paciente>();
  
  filterValue = '';

  constructor(private cdRef : ChangeDetectorRef) { }
  

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  applyFilter(event : Event){
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  onPacienteSeleccionado(paciente : Paciente){
    this.pacienteSeleccionadoEvent.emit(paciente);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    }); 
  }
}
