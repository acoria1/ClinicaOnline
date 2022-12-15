import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { WeekDay } from 'src/app/classes/weekDay';
import { Especialidad } from 'src/app/Entities/especialidad';
import { Paciente } from 'src/app/Entities/paciente';
import { Profesional } from 'src/app/Entities/profesional';
import { Turno } from 'src/app/Entities/turno';
import { UserFactory } from 'src/app/Entities/user-factory';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.scss']
})
export class NuevoTurnoComponent implements OnInit, AfterViewChecked {

  currentStep : number = 0;
  pacientes? : Paciente[];
  pacienteSeleccionado? : Paciente;
  profesionales? : Profesional[];
  profesionalSeleccionado? : Profesional;
  especialidadSeleccionada? : string;
  fecha? : WeekDay;
  turno? : Turno;

  @ViewChild('stepper') private myStepper!: MatStepper;

  constructor(private _usuariosService : UsersService, public auth : AuthService, private cdRef : ChangeDetectorRef, private _router : Router, public dialog : MatDialog, private turnosService : TurnosService) { }
  

  ngOnInit(): void {
    if(this.auth.isAdmin){
      this.traerPacientes();
    }
    this.traerProfesionales();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  traerPacientes(){
    this._usuariosService.getUsuarios()
      .subscribe(data => {
        //save current for reasignment after fetching
      let indexOfCurrent = this.pacientes?.indexOf(this.pacienteSeleccionado!);
      this.pacientes = data
      .filter((obj : any) => {
        return (obj.typename.toLowerCase() == 'paciente')
      })
      .map((obj : any) => {
        return this.parseUser(obj);    
      });
      //reasign last selected to update data if changed.
      if (indexOfCurrent != undefined){
        this.pacienteSeleccionado = this.pacientes![indexOfCurrent];
      }
    })
  }
  
  traerProfesionales() : void {
    this._usuariosService.getUsuarios()
      .subscribe(data => {
        //save current for reasignment after fetching
      let indexOfCurrent = this.profesionales?.indexOf(this.profesionalSeleccionado!);
      this.profesionales = data
      .filter((obj : any) => {
        return (obj.typename.toLowerCase() == 'profesional') && (obj.habilitado == true)
      })
      .map((obj : any) => {
        return this.parseUser(obj);    
      });
      //reasign last selected to update data if changed.
      if (indexOfCurrent != undefined){
        this.profesionalSeleccionado = this.profesionales![indexOfCurrent];
      }
    })
  }

  parseUser(obj : any){
    return UserFactory.constructUser(obj);
  }

  setPacienteSeleccionado(paciente : Paciente){
    this.pacienteSeleccionado = paciente;
    this.advanceStepper();
  }

  setProfesionalSeleccionado(profesional : Profesional){
    this.profesionalSeleccionado = profesional;
    this.advanceStepper();
  }

  setEspecialidadSeleccionada(especialidad : string){
    this.especialidadSeleccionada = especialidad;
    this.advanceStepper();
  }

  onFechaSeleccionada(fecha : WeekDay){
    this.fecha = fecha;
    this.advanceStepper();
  }

  onTurnoSeleccionado(turno : Turno){
    this.turno = turno;
    this.turno.estado = "PENDIENTE";
    this.turno.idPaciente = this.pacienteSeleccionado ? this.pacienteSeleccionado.uid : this._usuariosService.getCurrentUser().uid!;
    this.turno.profesional = this.profesionalSeleccionado;
    this.turno.paciente = this.pacienteSeleccionado ?? this._usuariosService.getCurrentUser();
    this.advanceStepper();
  }

  onTurnoConfirmado(){
    this.turnosService.guardarTurno(this.turno!);
    this.advanceStepper();
  }

  advanceStepper() : void{
    this.myStepper.steps.get(this.currentStep)!.completed = true;
    this.myStepper.next();
    this.currentStep++;
  }

  goHome(){
    this._router.navigateByUrl('home');
  }
  
  resetForm(){
    this.myStepper.reset();
    this.currentStep = 0;
  }
}