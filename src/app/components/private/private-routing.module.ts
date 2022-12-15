import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiPerfilComponent } from '../mi-perfil/mi-perfil.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { HabilitadoGuard } from 'src/app/guards/habilitado.guard';
import { ProfesionalGuard } from 'src/app/guards/profesional.guard';
import { AltaHorariosComponent } from '../alta-horarios/alta-horarios.component';
import { InformesComponent } from '../informes/informes.component';
import { NotAuthorizedComponent } from '../not-authorized/not-authorized.component';
import { MisPacientesComponent } from '../profesionales/mis-pacientes/mis-pacientes.component';
import { RegistroAdminComponent } from '../registro-admin/registro-admin.component';
import { NuevoTurnoComponent } from '../turnos/nuevo-turno/nuevo-turno.component';
import { TurnosComponent } from '../turnos/turnos.component';

const routes : Routes = [
  {path: 'mi-perfil' , component: MiPerfilComponent, canActivate : [AuthGuard]},
  {path: 'usuarios' , component: UsuariosComponent, canActivate : [AdminGuard]},
  {path: 'register-admin' , component: RegistroAdminComponent, canActivate : [AdminGuard]},
  {path: 'alta-horarios' , component: AltaHorariosComponent, canActivate : [ProfesionalGuard, HabilitadoGuard]},
  {path: 'nuevo-turno' , component: NuevoTurnoComponent, canActivate : [AuthGuard, HabilitadoGuard]},
  {path: 'mis-turnos' , component: TurnosComponent, canActivate : [AuthGuard, HabilitadoGuard]},
  {path: 'mis-pacientes' , component: MisPacientesComponent, canActivate : [ProfesionalGuard, HabilitadoGuard]},
  {path: 'informes' , component: InformesComponent, canActivate : [AdminGuard]},
  {path: 'not-authorized' , component: NotAuthorizedComponent, canActivate : [AuthGuard], data : { animation : 'NotAuthorizedPage'}},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
