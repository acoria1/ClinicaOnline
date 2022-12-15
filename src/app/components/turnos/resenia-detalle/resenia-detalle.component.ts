import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resenia-detalle',
  templateUrl: './resenia-detalle.component.html',
  styleUrls: ['./resenia-detalle.component.scss']
})
export class ReseniaDetalleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
