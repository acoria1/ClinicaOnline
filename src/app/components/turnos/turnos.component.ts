import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CancelarRechazarTurnoComponent } from 'src/app/dialogs/cancelar-rechazar-turno/cancelar-rechazar-turno.component';
import { accionTurno } from 'src/app/Entities/accion-turno';
import { HistoriaClinica } from 'src/app/Entities/historia-clinica';
import { Paciente } from 'src/app/Entities/paciente';
import { TimeHandler } from 'src/app/Entities/time-handler';
import { Turno } from 'src/app/Entities/turno';
import { User } from 'src/app/Entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsersService } from 'src/app/services/users.service';
import { HistoriaClinicaDetalleComponent } from '../historia-clinica-detalle/historia-clinica-detalle.component';
import { HistoriaClinicaFormComponent } from '../historia-clinica-form/historia-clinica-form.component';
import { EncuestaPacienteComponent } from '../pacientes/encuesta-paciente/encuesta-paciente.component';
import { ReseniaDetalleComponent } from './resenia-detalle/resenia-detalle.component';

interface Filtro {
  valor : number | string;
  operador : '>' | '=' | '<' | '';
}

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {
  
  misTurnos : Turno[] = [];
  filteredTurnos : Turno[] = [];

  filtroProfesional? : string;
  filtroEspecialidad? : string;
  filtroPaciente? : string;
  filtroEstado? : string;
  filtrosHistoriaClinica : { filtroAltura : Filtro, filtroPeso : Filtro, filtroPresion : Filtro, filtroTemperatura : Filtro} 
  = {filtroAltura : {valor : 150, operador: ''}, filtroPeso : {valor : 50, operador: ''}, filtroPresion : {valor : '', operador: ''}, filtroTemperatura : {valor : 30, operador: ''}};
  filtroDatosAdicionales? : string;
  operadores : string[] = ['>', '=', '<'];
  mostrarFiltros = false;

  constructor(private turnosService : TurnosService, private usersService : UsersService, public dialog: MatDialog, public router : Router, public auth : AuthService) { }

  ngOnInit(): void {
    let turnos =
    this.turnosService.getTurnosUsuario(this.usersService.getCurrentUser().uid, this.usersService.getCurrentUser().typename);
    if (turnos !== undefined){
      turnos.subscribe(turnos => {
        this.misTurnos = (<Turno[]>turnos).sort((a,b) => 
          TimeHandler.compareDates({fecha : a.fecha, inicia : a.inicia},{fecha : b.fecha, inicia : b.inicia})
        );
        this.filteredTurnos = this.misTurnos;
        this.applyBasicFilters();
      });
    }    
  }

  onAccion(obj : {accion : accionTurno, turno : Turno}){
    switch (obj.accion.accion) {
      case 'ACEPTAR':
        this.handleAceptarTurno(obj);
        break;
      case 'RECHAZAR':
        this.handleRechazarTurno(obj);
        break;
      case 'CANCELAR' :
        this.handleCancelarTurno(obj);
        break;
      case 'FINALIZAR' :
        this.handleFinalizarTurno(obj);
      break;
      case 'VER RESENIA':
        this.handleMostrarResenia(obj);
      break;
      case 'VER HISTORIA CLINICA':
        this.handleMostrarHistoria(obj);
        break;
      case 'COMPLETAR ENCUESTA':
        this.handleCompletarEncuesta(obj);
        break;
      default : 
        console.log(obj);
      break;
    }
  }

  handleAceptarTurno(obj : {accion : accionTurno, turno : Turno}) : void{
    obj.turno.estado = obj.accion.nuevoEstado!;
    this.turnosService.updateTurno(obj.turno);
  }

  handleRechazarTurno(obj : {accion : accionTurno, turno : Turno}) : void{
    let dialogRef = this.dialog.open(CancelarRechazarTurnoComponent, {
      data: {razon: '', accion: obj.accion.accion}, width : '350px', height : '300px'
    });
      dialogRef.afterClosed().subscribe((razon : string) => {
        if(razon !== undefined){
          obj.turno.razonRechazo = razon;
          obj.turno.estado = obj.accion.nuevoEstado!;
          this.turnosService.updateTurno(obj.turno);
        }
    });
  }

  handleCancelarTurno(obj : {accion : accionTurno, turno : Turno}) : void{
    let dialogRef2 = this.dialog.open(CancelarRechazarTurnoComponent, {
      data: {razon: '', accion: obj.accion.accion}, width : '350px', height : '300px'
    });
      dialogRef2.afterClosed().subscribe((razon : string) => {
        if(razon !== undefined){
          obj.turno.razonCancelacion = razon;
          obj.turno.estado = obj.accion.nuevoEstado!;
          this.turnosService.updateTurno(obj.turno);
        }          
    });
  }

  handleFinalizarTurno(obj : {accion : accionTurno, turno : Turno}) : void{
    this.dialog
      .open(HistoriaClinicaFormComponent, {
        data: {}, width : '700px', height : '600px'
      })
      .afterClosed().subscribe((result : {historiaClinica : HistoriaClinica, resenia : string}) => {
        if(result !== undefined){
          obj.turno.historiaClinica = result.historiaClinica;
          obj.turno.resenia = result.resenia;
          obj.turno.estado = obj.accion.nuevoEstado!;
          this.turnosService.updateTurno(obj.turno);
        }      
      });
  }

  handleMostrarResenia(obj : {accion : accionTurno, turno : Turno}) : void{
    this.dialog.open(ReseniaDetalleComponent, {
      data : { resenia : obj.turno.resenia}, width : '600px', height: '400px'
    })
  }
  
  handleMostrarHistoria(obj : {accion : accionTurno, turno : Turno}) : void{
    this.dialog.open(HistoriaClinicaDetalleComponent, {
      data : { historia : obj.turno.historiaClinica}, width : '600px', height: '400px'
    })
  }

  handleCompletarEncuesta(obj : {accion : accionTurno, turno : Turno}) : void{
    this.dialog.open(EncuestaPacienteComponent, { data : {}, width : '500px', height : '600px'}).afterClosed().subscribe(encuesta => {
      if(encuesta !== undefined){
        obj.turno.encuestaPaciente = encuesta;
        this.turnosService.updateTurno(obj.turno);
      }
    })
  }

  goToNuevoTurno(){
    this.router.navigateByUrl('nuevo-turno');
  }

  applyFilters() : void {

    this.filteredTurnos = this.misTurnos;

    this.applyBasicFilters();
    this.applyAdvancedFilters();
    this.mostrarFiltros = false;
  }

  applyBasicFilters(){

    this.filtrarPorEspecialidad();    
    this.filtrarPorProfesional();
    this.filtrarPorPaciente();
    this.filtrarPorEstado();
  }
  
  applyAdvancedFilters(){
    this.filtrarPorDatosAdicionales();
    this.filtrarPorHistoriaClinica();
  }

  filtrarPorEspecialidad(){
    this.filteredTurnos = 
    this.filtroEspecialidad == undefined || this.filtroEspecialidad == '' ? 
    this.filteredTurnos :
    this.filteredTurnos.filter((t)=>
      t.especialidad.toLowerCase().includes(this.filtroEspecialidad!.toLowerCase())
    )
  }

  filtrarPorProfesional(){
    this.filteredTurnos = 
    this.filtroProfesional == undefined || this.filtroProfesional == '' ? 
    this.filteredTurnos :
    this.filteredTurnos.filter((t)=> 
      (`${t.profesional!.apellido} ${t.profesional!.nombre}`).toLowerCase()
      .includes(this.filtroProfesional!.toLowerCase())
    )
  }

  filtrarPorPaciente(){
    this.filteredTurnos = 
    this.filtroPaciente == undefined || this.filtroPaciente == '' ? 
    this.filteredTurnos :
    this.filteredTurnos.filter((t)=>
      JSON.stringify(Paciente.filterPublic(t.paciente)).toLowerCase()
      .includes(this.filtroPaciente!.toLowerCase())
    )
  }

  filtrarPorEstado(){
    this.filteredTurnos = 
    this.filtroEstado == undefined || this.filtroEstado == '' ? 
    this.filteredTurnos :
    this.filteredTurnos.filter((t)=> {
      return t.estado.toLowerCase().includes(this.filtroEstado!.toLowerCase())
    });
  }

  filtrarPorDatosAdicionales(){
    this.filteredTurnos = 
    this.filtroDatosAdicionales == undefined || this.filtroDatosAdicionales == '' ? 
    this.filteredTurnos :
    this.filteredTurnos.filter((t)=> {
      return t.historiaClinica !== undefined && 
        t.historiaClinica.datosAdicionales !== undefined &&
        (JSON.stringify(t.historiaClinica?.datosAdicionales)).toLowerCase().includes(this.filtroDatosAdicionales!.toLowerCase())
    });
  }

  filtrarPorHistoriaClinica() : void{
    if(!this.existenFiltrosAvanzados()){
      return;
    }
    this.filteredTurnos = 
    this.filteredTurnos.filter((t)=> {
      return t.historiaClinica != undefined && 
      (
      this.condicionSeCumple(t.historiaClinica!.alturaCM!, this.filtrosHistoriaClinica.filtroAltura.operador, <number>this.filtrosHistoriaClinica.filtroAltura.valor) && 
      this.condicionSeCumple(t.historiaClinica!.pesoKG!, this.filtrosHistoriaClinica.filtroPeso.operador, <number>this.filtrosHistoriaClinica.filtroPeso.valor) && 
      this.condicionSeCumple(t.historiaClinica!.temperatura!, this.filtrosHistoriaClinica.filtroTemperatura.operador, <number>this.filtrosHistoriaClinica.filtroTemperatura.valor) && 
      t.historiaClinica!.presion.toLowerCase().includes((<string>this.filtrosHistoriaClinica.filtroPresion.valor!).toLowerCase())
      )
    });
  }

  existenFiltrosAvanzados() :boolean {
    return this.filtrosHistoriaClinica.filtroAltura.operador !== '' ||
    this.filtrosHistoriaClinica.filtroPeso.operador !== '' ||
    this.filtrosHistoriaClinica.filtroTemperatura.operador !== '' ||
    this.filtrosHistoriaClinica.filtroPresion.valor !== ''
  }

  condicionSeCumple(dato1 : number, operador : string, dato2 : number) : boolean {
    switch (operador) {
      case '<':
        return dato1 < dato2;
        case '=':
        return dato1 == dato2;
        case '>':
        return dato1 > dato2;
      default:
        return true
    }
  }

  resetFilters(){
    this.filtroEspecialidad = '';
    this.filtroPaciente = '';
    this.filtroProfesional = '';
    this.filtroEstado = '';
    this.filtroDatosAdicionales = '';
    this.filteredTurnos = this.misTurnos;
  }
}
