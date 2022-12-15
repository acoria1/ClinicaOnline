import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogDataCancelar {
  razon: string;
  accion: string;
}

@Component({
  selector: 'app-cancelar-rechazar-turno',
  templateUrl: './cancelar-rechazar-turno.component.html',
  styleUrls: ['./cancelar-rechazar-turno.component.scss']
})
export class CancelarRechazarTurnoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CancelarRechazarTurnoComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
