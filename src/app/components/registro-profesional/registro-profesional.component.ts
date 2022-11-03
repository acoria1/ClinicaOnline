import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/Entities/custom-validator';
import { MyErrorStateMatcher } from 'src/app/Entities/my-error-state-matcher';
import { User } from 'src/app/Entities/user';
import { Especialidad } from 'src/app/Entities/especialidad';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.scss']
})

export class RegistroProfesionalComponent implements OnInit {

  hidePassword : Boolean[] = [true,true];
  matcher = new MyErrorStateMatcher();
  public registerForm! : FormGroup;
  emailAlreadyInUse = false;
  imagenesPerfil : string[] = [];
  especialidades : Especialidad[] = [];
  visible : Boolean = false;

  // constructor(public auth: Auth, public firestore: Firestore, private fb: FormBuilder) { }
  constructor(public auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'nombre' :  ['', [Validators.required]],
      'apellido' :  ['', [Validators.required]],
      'edad' :  ['', [Validators.required, Validators.min(1)]],
      'dni' :  ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]],
      'confirmPassword' : ['']
    }, { validators: CustomValidator.checkPasswords});
    
    this.registerForm.valueChanges.subscribe(()=>{
      this.emailAlreadyInUse = false;
    })    
  }

  togglePasswordVisibility(index : number){
    this.hidePassword[index] = !this.hidePassword[index];
  }

  handleRegister(){
    this.auth.SignUp(
      this.constructUser(),
      this.registerForm.get('password')!.value)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use"){
          this.emailAlreadyInUse = true;
        }
      });
  }

  constructUser() : User{
    return new User(
      this.registerForm.get('email')!.value,
      this.registerForm.get('nombre')!.value,
      this.registerForm.get('apellido')!.value,
      this.registerForm.get('edad')!.value,
      this.imagenesPerfil
      )    
  }

  refrescarEspecialidades(especialidades : Especialidad[]){
    this.especialidades = especialidades;
  }

  mostrarFormulario(c : any){
    this.visible = true;
  }
}


