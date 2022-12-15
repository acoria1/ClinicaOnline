import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseAppModule, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';

//Angular Material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularMaterialModule } from './material/angular-material/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { RegistroProfesionalComponent } from './components/registro-profesional/registro-profesional.component';
import { CustomButtonsComponent } from './components/custom-buttons/custom-buttons.component';
import { SubirImagenComponent } from './components/subir-imagen/subir-imagen.component';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { RegistroAdminComponent } from './components/registro-admin/registro-admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuario-detalle/usuario-detalle.component';
import { UsuarioListadoComponent } from './components/usuarios/usuario-listado/usuario-listado.component';
import { BoolESPipe } from './pipes/bool-es.pipe';
import { OkCancelComponent } from './dialogs/ok-cancel/ok-cancel.component';
import { AltaHorariosComponent } from './components/alta-horarios/alta-horarios.component';
import { HorarioPipe } from './pipes/horario.pipe';
import { TurnosComponent } from './components/turnos/turnos.component';
import { NuevoTurnoComponent } from './components/turnos/nuevo-turno/nuevo-turno.component';
import { ListadoTurnosComponent } from './components/turnos/listado-turnos/listado-turnos.component';
import { ProfesionalesComponent } from './components/profesionales/profesionales.component';
import { ListadoProfesionalesComponent } from './components/profesionales/listado-profesionales/listado-profesionales.component';
import { ProfesionalDetalleComponent } from './components/profesionales/profesional-detalle/profesional-detalle.component';
import { SeleccionarProfesionalComponent } from './components/turnos/nuevo-turno/seleccionar-profesional/seleccionar-profesional.component';
import { SeleccionarEspecialidadComponent } from './components/turnos/nuevo-turno/seleccionar-especialidad/seleccionar-especialidad.component';
import { SeleccionarTurnoComponent } from './components/turnos/nuevo-turno/seleccionar-turno/seleccionar-turno.component';
import { SeleccionarDiaComponent } from './components/turnos/nuevo-turno/seleccionar-dia/seleccionar-dia.component';
import { TurnoDetalleComponent } from './components/turnos/turno-detalle/turno-detalle.component';
import { ModificarEstadoTurnoComponent } from './components/turnos/modificar-estado-turno/modificar-estado-turno.component';
import { MisTurnosComponent } from './components/turnos/mis-turnos/mis-turnos.component';
import { CancelarRechazarTurnoComponent } from './dialogs/cancelar-rechazar-turno/cancelar-rechazar-turno.component';
import { HistoriaClinicaFormComponent } from './components/historia-clinica-form/historia-clinica-form.component';
import { SeleccionarPacienteComponent } from './components/turnos/nuevo-turno/seleccionar-paciente/seleccionar-paciente.component';
import { ListadoPacientesComponent } from './components/pacientes/listado-pacientes/listado-pacientes.component';
import { ReseniaDetalleComponent } from './components/turnos/resenia-detalle/resenia-detalle.component';
import { HistoriaClinicaDetalleComponent } from './components/historia-clinica-detalle/historia-clinica-detalle.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { CaptchaDialogComponent } from './dialogs/captcha-dialog/captcha-dialog.component';
import { EncuestaPacienteComponent } from './components/pacientes/encuesta-paciente/encuesta-paciente.component';

//Other
import { StarRatingModule } from 'angular-star-rating';
import { HistoriaClinicaComponent } from './dialogs/historia-clinica/historia-clinica.component';
import { PacienteDetalleComponent } from './pacientes/paciente-detalle/paciente-detalle.component';
import { MisPacientesComponent } from './components/profesionales/mis-pacientes/mis-pacientes.component';
import { HistoriaClinicaListadoComponent } from './components/historia-clinica-listado/historia-clinica-listado.component';

//files
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { InformesComponent } from './components/informes/informes.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { HighligthDirective } from './directives/highligth.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavbarComponent,
    EspecialidadesComponent,
    CapitalizePipe,
    RegistroPacienteComponent,
    RegistroProfesionalComponent,
    CustomButtonsComponent,
    SubirImagenComponent,
    MiPerfilComponent,
    RegistroAdminComponent,
    UsuariosComponent,
    UsuarioDetalleComponent,
    UsuarioListadoComponent,
    BoolESPipe,
    OkCancelComponent,
    AltaHorariosComponent,
    HorarioPipe,
    TurnosComponent,
    NuevoTurnoComponent,
    ListadoTurnosComponent,
    ProfesionalesComponent,
    ListadoProfesionalesComponent,
    ProfesionalDetalleComponent,
    SeleccionarProfesionalComponent,
    SeleccionarEspecialidadComponent,
    SeleccionarTurnoComponent,
    SeleccionarDiaComponent,
    TurnoDetalleComponent,
    ModificarEstadoTurnoComponent,
    MisTurnosComponent,
    CancelarRechazarTurnoComponent,
    HistoriaClinicaFormComponent,
    SeleccionarPacienteComponent,
    ListadoPacientesComponent,
    ReseniaDetalleComponent,
    HistoriaClinicaDetalleComponent,
    CaptchaComponent,
    CaptchaDialogComponent,
    EncuestaPacienteComponent,
    HistoriaClinicaComponent,
    PacienteDetalleComponent,
    MisPacientesComponent,
    HistoriaClinicaListadoComponent,
    InformesComponent,
    NotAuthorizedComponent,
    HighligthDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    StarRatingModule.forRoot(),
    ChartModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    AuthService,
    CapitalizePipe,
    FilesService,
    UsersService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
