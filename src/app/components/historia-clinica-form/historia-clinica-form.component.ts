import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaClinica } from 'src/app/Entities/historia-clinica';

@Component({
  selector: 'app-historia-clinica-form',
  templateUrl: './historia-clinica-form.component.html',
  styleUrls: ['./historia-clinica-form.component.scss']
})
export class HistoriaClinicaFormComponent implements OnInit {

  alturaCM : number = 0;
  pesoKG : number  = 0;;
  temperatura : number = 0;
  presion : string  = "";
  resenia : string = "";
  datosAdicionales : { key : string, value : string}[] = [{key : "", value : ""},{key : "", value : ""},{key : "", value : ""}];
  clavesRepetidas = false;
  clavesConEspacios = false;

  constructor(public dialogRef: MatDialogRef<HistoriaClinicaFormComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitDialog(){
    let historiaResenia = this.getHistoriaResenia();
    if (historiaResenia.historiaClinica !== undefined){
      this.dialogRef.close(this.getHistoriaResenia());
    }
  }

  getHistoriaResenia(){
    return { historiaClinica : this.constructHistoria(), resenia : this.resenia};
  }

  constructHistoria(){
    let datosAdicionales = this.getDatosAdicionales();
    return  datosAdicionales !== undefined ? 
    {
      alturaCM : this.alturaCM,
      pesoKG : this.pesoKG,
      temperatura : this.temperatura,
      presion : this.presion,
      datosAdicionales : datosAdicionales
    } : undefined;
  }

  getDatosAdicionales() : Object | undefined{
    
    if(this.hayClavesConEspacios()){
      this.clavesConEspacios = true;
      return undefined;
    }
    if(this.hayClavesRepetidas()){
      this.clavesRepetidas = true;
      return undefined;
    }

    let obj : any = {};
    this.getDatosCompletos().forEach(dato => {
      obj[dato.key] = dato.value
    })
    return obj;
  }
  
  getDatosCompletos() {
    return this.datosAdicionales.filter(dato => dato.key.length > 0 && dato.value.length > 0)
  }

  hayClavesRepetidas() : boolean {
    let datos = this.getDatosCompletos()
    let claves = datos.map((dato => dato.key));
    console.log((new Set(claves)).size, datos.length);
    return ((new Set(claves)).size !== datos.length);
  }

  hayClavesConEspacios () : boolean{
    let result = false;
    this.getDatosCompletos().forEach( dato =>{
      if (dato.key.indexOf(' ') >= 0){
        result = true;
      }
    });
    return result;
  }
}
