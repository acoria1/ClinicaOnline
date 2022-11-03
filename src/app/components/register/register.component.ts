import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/Entities/custom-validator';
import { MyErrorStateMatcher } from 'src/app/Entities/my-error-state-matcher';
import { User } from 'src/app/Entities/user';
import { Especialidad } from 'src/app/Entities/especialidad';
import { Feature } from 'src/app/classes/feature';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  opcionesRegistro : Feature[] = [
    { label : "Paciente", color : 'warn'},
    { label : "Profesional", color : 'accent'}
  ];
  opcionSeleccionada? : Feature;

  // constructor(public auth: Auth, public firestore: Firestore, private fb: FormBuilder) { }
  constructor() { }

  ngOnInit(): void {
        
  }

  mostrarFormRegistro(feature : Feature){
    this.opcionSeleccionada = feature;
  }

}

