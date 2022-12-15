import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-captcha-dialog',
  templateUrl: './captcha-dialog.component.html',
  styleUrls: ['./captcha-dialog.component.scss']
})
export class CaptchaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CaptchaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  resolveCaptcha(success : boolean){
    this.dialogRef.close(success);
  }

}
