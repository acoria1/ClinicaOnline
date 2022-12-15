import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subir-img-dialog',
  templateUrl: './subir-img-dialog.component.html',
  styleUrls: ['./subir-img-dialog.component.scss']
})
export class SubirImgDialogComponent implements OnInit {

  imagen? : any;
  
  constructor(public dialogRef: MatDialogRef<SubirImgDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getImage(imagen : any){
    this.imagen = imagen;
  }
}
