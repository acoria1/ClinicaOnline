import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

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
    UsuariosComponent
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
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    AuthService,
    CapitalizePipe,
    FilesService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
