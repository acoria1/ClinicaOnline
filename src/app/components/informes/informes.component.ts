import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import { Chart } from 'angular-highcharts';
import { TimeHandler } from 'src/app/Entities/time-handler';
import { User } from 'src/app/Entities/user';
import { UserFactory } from 'src/app/Entities/user-factory';
import { UsersService } from 'src/app/services/users.service';
import { lastValueFrom } from 'rxjs';
import { FilesService } from 'src/app/services/files.service';


interface Log {
  type : 'in' | 'out';
  fecha : string;
  timestamp : string;
}

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit, AfterViewChecked {

  usuarios? : any[];
  usuarioSeleccionado? : User;
  filterValue = '';

  turnosPorEspecialidad : {especialidad : string, turnos : any}[] = [];
  turnosPorDia : { fecha : string, turnos : any}[] = [];
  turnosPendientesProf : { idProfesional : string, turnos : any}[] = [];
  turnosFinalizadosProf : { idProfesional : string, turnos : any}[] = [];
  logs : { fecha : string, accesos : number}[] = [];

  filteredData : {
    turnosPorEspecialidad : {especialidad : string, turnos : any}[];
    turnosPorDia : { fecha : string, turnos : any}[];
    turnosPendientesProf : { idProfesional : string, turnos : any}[];
    turnosFinalizadosProf : { idProfesional : string, turnos : any}[];
    logs : { fecha : string, accesos : number}[];
  } = {
    turnosPorEspecialidad : [],
    turnosPorDia : [],
    turnosPendientesProf : [],
    turnosFinalizadosProf : [],
    logs : []
  }

  especialidadesChart? : Chart;
  diasChart? : Chart;
  pendientesChart? : Chart;
  finalizadosChart? : Chart;
  logsChart? : Chart;

  filtroInicio? : Date;
  filtroFin? : Date; 

  constructor(private turnosService : TurnosService, private _usuariosService : UsersService, private cdRef : ChangeDetectorRef, private filesService : FilesService) { }

  ngOnInit(): void {
    this.constructInformes();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  constructInformes(){
    this.getTurnosPorEspecialidad();
    this.getTurnosPorDia();
    this.getTurnosPendientesProf();
    this.getTurnosFinalizadosProf();
    this.traerUsuarios();
  }

  traerUsuarios() : void {
    this._usuariosService.getUsuarios()
      .subscribe(data => {
        //save current movie for reasignment
      let indexOfCurrent = this.usuarios?.indexOf(this.usuarioSeleccionado!);
      this.usuarios = data.map((obj : any) => {
        return UserFactory.constructUser(obj);    
      });
      //reasign current selected movie to update data if changed.
      if (indexOfCurrent != undefined){
        this.usuarioSeleccionado = this.usuarios![indexOfCurrent];
      }
    })
  }

  applyFilter(event : Event){
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  onUsuarioSeleccionado(usuarioSeleccionado : User){
    this.usuarioSeleccionado = usuarioSeleccionado;
    this.getLogs();
  }

  async getLogs(){
    this.logs = [];
    let data = await (await lastValueFrom(this._usuariosService.getUserLogs(this.usuarioSeleccionado?.uid!))).data();
    if (data== undefined){
      return
    }
    const map = new Map();
    let auxLogs = <Log[]>((<{logs : any[]}>data).logs);
    auxLogs.filter(l => l.type == 'in')
      .forEach((log)=> {
        if (map.has(log.fecha)){
          map.set(log.fecha, (map.get(log.fecha) + 1))
        } else {
          map.set(log.fecha, 1);
        }
      });
      map.forEach((value,key) => {
        this.logs.push({fecha : key, accesos : value});
      });
      this.logs = this.logs.sort((a , b) => {
        return TimeHandler.compareDates({fecha : a.fecha, inicia : '08:00'}, {fecha : b.fecha, inicia : '08:00'})
      })
      this.filteredData.logs = this.logs;
      this.loadLogsChart();
  }

  loadLogsChart(){
    this.logsChart = new Chart({
      chart: {
        renderTo: 'container',
        type: 'line'
      },
      title: {
          text: 'Accesos al Sistema'
      },
      xAxis: {  
          categories:[...this.filteredData.logs.map(log => log.fecha)]
      },
      yAxis: {
          title: {
              text: 'Cantidad de Accesos'
          },
          tickInterval: 1
      },
      series: [
        {
          name: 'Accesos',
          data: [...this.filteredData.logs.map(log => log.accesos)],
          type : 'line'
        }
      ]
    })
  }

  async getTurnosPorEspecialidad(){
    let map = await this.turnosService.getCountByField('especialidad');
    map.forEach((value,key) => {
        this.turnosPorEspecialidad.push({especialidad : key, turnos : value});
    });
    this.turnosPorEspecialidad = this.turnosPorEspecialidad.sort((a , b) => {
      return a.turnos.length < b.turnos.length ? 1 : -1
    });
    this.filteredData.turnosPorEspecialidad = this.turnosPorEspecialidad;
    this.loadEspecialidadesChart();
  }

  loadEspecialidadesChart(){
    this.especialidadesChart = new Chart({
      chart: {
        renderTo: 'container',
        type: 'column'
      },
      title: {
          text: 'Turnos Por Especialidad'
      },
      xAxis: {  
          categories:['Especialidades']
      },
      yAxis: {
          title: {
              text: 'Cantidad Turnos'
          },
          tickInterval: 1
      },
      series: this.filteredData.turnosPorEspecialidad.map(tpe => {
        return {name : tpe.especialidad, data : [tpe.turnos.length], type : 'column'}
      })
    })
  }

  async getTurnosPorDia(){
    let map = await this.turnosService.getCountByField('fecha')
    map.forEach((value,key) => {
      this.turnosPorDia.push({fecha : key, turnos : value});
    });
    this.turnosPorDia = this.turnosPorDia.sort((a , b) => {
      return TimeHandler.compareDates({fecha : a.fecha, inicia : '08:00'}, {fecha : b.fecha, inicia : '08:00'})
    })
    this.filteredData.turnosPorDia = this.turnosPorDia;
    this.loadDiasChart();
  }
  
  loadDiasChart(){
    this.diasChart = new Chart({
      chart: {
        renderTo: 'container',
        type: 'line'
      },
      title: {
          text: 'Turnos Por Fecha'
      },
      xAxis: {  
          categories:[...this.filteredData.turnosPorDia.map(txd => txd.fecha)]
      },
      yAxis: {
          title: {
              text: 'Cantidad Turnos'
          },
          tickInterval: 1
      },
      series: [
        {
          name: 'Turnos',
          data: [...this.filteredData.turnosPorDia.map(txd => txd.turnos.length)],
          type : 'line'
        }
      ]
    })
  }

  async getTurnosPendientesProf(){
    let map = await this.turnosService.getCountByField('idProfesional','PENDIENTE','==');
    map.forEach((value,key) => {
      this.turnosPendientesProf.push({idProfesional : key, turnos : value});
    });
    this.turnosPendientesProf = this.turnosPendientesProf.sort((a , b) => {
      return a.turnos.length < b.turnos.length ? 1 : -1
    });
    this.filteredData.turnosPendientesProf = this.turnosPendientesProf;
    this.loadPendientesChart();
  }

  loadPendientesChart(){
    this.pendientesChart = new Chart({
      chart: {
        renderTo: 'container',
        type: 'column',
      },
      title: {
          text: 'Turnos Pendientes'
      },
      xAxis: {  
          categories:['Profesionales']
      },
      yAxis: {
          title: {
              text: 'Cantidad Turnos'
          },
          tickInterval: 1
      },
      series: this.filteredData.turnosPendientesProf.map(txp => {
        return {name : txp.turnos[0].profesional.apellido, data : [txp.turnos.length], type : 'column'}
      })
    })
  }

  async getTurnosFinalizadosProf(){
    let map = await this.turnosService.getCountByField('idProfesional','FINALIZADO','==')
    map.forEach((value,key) => {
      this.turnosFinalizadosProf.push({idProfesional : key, turnos : value});
    });
    this.turnosFinalizadosProf = this.turnosFinalizadosProf.sort((a , b) => {
      return a.turnos.length < b.turnos.length ? 1 : -1
    });
    this.filteredData.turnosFinalizadosProf = this.turnosFinalizadosProf;
    this.loadFinalizadosChart();
  }

  loadFinalizadosChart(){
    this.finalizadosChart = new Chart({
      chart: {
        renderTo: 'container',
        type: 'column',
      },
      title: {
          text: 'Turnos Finalizados'
      },
      xAxis: {  
          categories:['Profesionales']
      },
      yAxis: {
          title: {
              text: 'Cantidad Turnos'
          },
          tickInterval: 1
      },
      series: this.filteredData.turnosFinalizadosProf.map(txp => {
        return {name : txp.turnos[0].profesional.apellido, data : [txp.turnos.length], type : 'column'}
      })
    })
  }

  applyFilters(){
    this.filteredData.logs = this.logs.filter(log => {
      return this.dateIsInRange(log.fecha)
    })
    this.constructCharts();
  }

  dateIsInRange(fecha : string) : boolean{
    if (this.filtroFin == undefined || this.filtroInicio == undefined){
      return true;
    }
    let auxFecha = TimeHandler.toDate({fecha : fecha, inicia :'00:00'});

    return auxFecha >= this.filtroInicio && auxFecha <= this.filtroFin;
  }

  resetFilters(){
    this.filtroFin = undefined;
    this.filtroInicio = undefined;
    this.filteredData.turnosFinalizadosProf = this.turnosFinalizadosProf;
    this.filteredData.turnosPendientesProf = this.turnosPendientesProf;
    this.filteredData.turnosPorDia = this.turnosPorDia;
    this.filteredData.turnosPorEspecialidad = this.turnosPorEspecialidad;
    this.filteredData.logs = this.logs;
    this.constructCharts();
  }

  constructCharts(){
    this.loadFinalizadosChart();
    this.loadPendientesChart();
    this.loadDiasChart();
    this.loadEspecialidadesChart();
    this.loadLogsChart();
  }

  descargarInformes(){
    this.filesService.exportInformesAsExcelFile({txe : this.parseTurnosEspecialidad(), txd : this.parseTurnosDia(), tpp : this.parseTurnosPendientes(), tfp : this.parseTurnosFinalizados(), logs : this.parseLogs()}, 'informes');
  }

  parseTurnosEspecialidad(){
    return this.filteredData.turnosPorEspecialidad.map(x => {
      return {especialidad : x.especialidad, turnos : x.turnos.length}
    })
  }

  parseTurnosDia(){
    return this.filteredData.turnosPorDia.map(x => {
      return {fecha : x.fecha, turnos : x.turnos.length}
    })
  }

  parseTurnosPendientes(){
    return this.filteredData.turnosPendientesProf.map(x => {
      return {idProfesional : x.idProfesional, nombre : x.turnos[0].profesional.apellido + " " + x.turnos[0].profesional.nombre, turnos : x.turnos.length}
    })
  }

  parseTurnosFinalizados(){
    return this.filteredData.turnosFinalizadosProf.map(x => {
      return {idProfesional : x.idProfesional, nombre : x.turnos[0].profesional.apellido + " " + x.turnos[0].profesional.nombre, turnos : x.turnos.length}
    })
  }

  parseLogs(){
    return this.filteredData.logs.length > 0 ? this.filteredData.logs : [{data : 'No hay usuario seleccionado'}]
  }
  
  // clearData(){
  //   this.turnosPorEspecialidad.length = 0;
  //   this.turnosPorDia.length = 0;
  //   this.turnosPendientesProf.length = 0;
  //   this.turnosFinalizadosProf.length = 0;
  //   this.logs.length = 0;
  // }

  // clearCharts(){
  //   this.especialidadesChart = undefined;
  //   this.diasChart = undefined;
  //   this.pendientesChart = undefined;
  //   this.finalizadosChart = undefined;
  //   this.logsChart = undefined;
  // }
}
