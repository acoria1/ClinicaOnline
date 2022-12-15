import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profesional } from 'src/app/Entities/profesional';

@Component({
  selector: 'app-seleccionar-profesional',
  templateUrl: './seleccionar-profesional.component.html',
  styleUrls: ['./seleccionar-profesional.component.scss']
})
export class SeleccionarProfesionalComponent implements OnInit, AfterViewChecked {

  @Input() profesionales? : Profesional[];
  @Output() profesionalSeleccionadoEvent = new EventEmitter<Profesional>();
  
  filterValue = '';

  constructor(private cdRef : ChangeDetectorRef) { }
  

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  applyFilter(event : Event){
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  onProfesionalSeleccionado(profesional : Profesional){
    this.profesionalSeleccionadoEvent.emit(profesional);
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    }); 
  }
}
