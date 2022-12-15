import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OkCancelComponent } from 'src/app/dialogs/ok-cancel/ok-cancel.component';
import { Especialidad } from 'src/app/Entities/especialidad';
import { Horario } from 'src/app/Entities/horario';
import { Profesional } from 'src/app/Entities/profesional';
import { UsersService } from 'src/app/services/users.service';
import { horariosEstandar } from 'src/assets/constants/horariosEstandar';

@Component({
  selector: 'app-alta-horarios',
  templateUrl: './alta-horarios.component.html',
  styleUrls: ['./alta-horarios.component.scss']
})
export class AltaHorariosComponent implements OnInit {

  profesional? : Profesional;

  @Output() horariosSeteadosEvent = new EventEmitter<void>();

  constructor(private usuariosService : UsersService, private router : Router, private dialog : MatDialog) { 
  }

  ngOnInit(): void {
    this.profesional = <Profesional>this.usuariosService.getCurrentUser();
  }


  guardarHorarios(){
    this.horariosSeteadosEvent.emit();
    this.usuariosService.updateHorariosProfesional(this.profesional!);
    let dialogRef = this.dialog.open(OkCancelComponent, 
      {
        data : {
          title : `¿Guardar Cambios?`, 
          message : `Presione OK para confirmar`
        }
      }
    );
    dialogRef.afterClosed().subscribe((response)=>{
      if (response == "ok"){
        this.router.navigateByUrl('home');
      }
    });
  }
}
