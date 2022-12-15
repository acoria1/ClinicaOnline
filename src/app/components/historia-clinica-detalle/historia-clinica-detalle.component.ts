import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historia-clinica-detalle',
  templateUrl: './historia-clinica-detalle.component.html',
  styleUrls: ['./historia-clinica-detalle.component.scss']
})
export class HistoriaClinicaDetalleComponent implements OnInit {

  datosAdicionales : { key : string, value : any}[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    for (const [key, value] of Object.entries(this.data.historia.datosAdicionales)) {
      this.datosAdicionales.push({key : key, value : value});
    }
  }


}
