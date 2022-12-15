import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profesional } from 'src/app/Entities/profesional';
import { TimeHandler } from 'src/app/Entities/time-handler';
import { User } from 'src/app/Entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsersService } from 'src/app/services/users.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { HistoriaClinica } from 'src/app/Entities/historia-clinica';
import { MatDialog } from '@angular/material/dialog';
import { ReseniaDetalleComponent } from '../turnos/resenia-detalle/resenia-detalle.component';
import { Paciente } from 'src/app/Entities/paciente';

interface HcView{
  fecha : string;
  profesional : string;
  especialidad : string;
  historiaClinica : HistoriaClinica;
  resenia : string;
}

@Component({
  selector: 'app-historia-clinica-listado',
  templateUrl: './historia-clinica-listado.component.html',
  styleUrls: ['./historia-clinica-listado.component.scss']
})
export class HistoriaClinicaListadoComponent implements OnInit, OnChanges {

  @Input() user! : any;
  @Input() profesional? : Profesional;
  historiaClinica? : HcView[];
  historiaClinicaFiltered? : HcView[];
  ref? : Subscription;
  profesionalesFilter : string[] = [];
  profesionalSeleccionado : string = 'todos';
  paciente? : string;

  constructor(public auth : AuthService, private usersService :  UsersService, private turnosService : TurnosService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getHistoriaClinica();

  }

  ngOnChanges(){
    this.ref?.unsubscribe();
    this.getHistoriaClinica();

  }

  getHistoriaClinica(){
    this.ref = this.turnosService.getTurnosPaciente(this.user.uid!).subscribe((turnos) => {
      this.historiaClinica = turnos
      .filter((t : any) => t.estado.toLowerCase() == 'finalizado' && (this.profesional == undefined || (t.idProfesional == this.profesional.uid!)))
      .sort((b : any ,a : any) => 
        TimeHandler.compareDates({fecha : a.fecha, inicia : a.inicia},{fecha : b.fecha, inicia : b.inicia})
      )
      .map((t : any) => {
        this.paciente = t.paciente.nombre + " " + t.paciente.apellido;
        return {fecha : t.fecha, profesional : `${t.profesional.apellido} ${t.profesional.nombre}`, historiaClinica : t.historiaClinica, especialidad : t.especialidad, resenia : t.resenia}
      });
      this.historiaClinica?.forEach(hc => {
        if(!this.profesionalesFilter.includes(hc.profesional)){
          this.profesionalesFilter.push(hc.profesional);
        }
      });
      this.filtrarPorProfesional();
    }
    )
  }

  filtrarPorProfesional(){
    if (this.profesionalSeleccionado == 'todos'){
      this.historiaClinicaFiltered = this.historiaClinica;
    } else {
      this.historiaClinicaFiltered = this.historiaClinica?.filter(hc => hc.profesional == this.profesionalSeleccionado);
    }
  }

  mostrarResenia(h : HcView){
    this.dialog.open(ReseniaDetalleComponent, {
      data : { resenia : h.resenia}, width : '600px', height: '400px'
    })
  }

  downloadPdf(){
    const doc = new jsPDF('p', 'mm', 'a3');
    let img = new Image();
    img.src = 'assets/images/logo.png';
    doc.text(`Historia Clinica de ${this.paciente}`,130,20);
    doc.text(TimeHandler.formatDate(new Date()),240,20);
    doc.table(10,30,this.parseHistoriaClinica(), this.getPdfHeaders(),{
      printHeaders: true,
      autoSize: true,
      css: {
        "font-size": 0.5
      }
    });
    doc.addImage(img,'png', 10, 8, 17, 15);
    doc.save(`hc_${this.user.apellido}_${this.user.nombre}.pdf`);
  }

  parseHistoriaClinica() : {[key: string]: string;}[]
  {
    if(this.historiaClinicaFiltered == undefined){
      return [];
    }

    return this.historiaClinicaFiltered?.map((h)=> {
      return {
        'Fecha' : h.fecha,
        'Profesional' : h.profesional,
        'Especialidad' : h.especialidad,
        'Altura' : h.historiaClinica.alturaCM.toString(),
        'Peso' : h.historiaClinica.pesoKG.toString(),
        'Temperatura' : h.historiaClinica.temperatura.toString(), 
        'Presion' : h.historiaClinica.presion,
        'Reseña' : h.resenia
      }
    });
  }

  getPdfHeaders(){
    return ['Fecha','Profesional','Especialidad','Altura','Peso','Temperatura','Presion','Reseña']
  }
}
