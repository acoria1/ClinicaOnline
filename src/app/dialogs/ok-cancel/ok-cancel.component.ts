import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ok-cancel',
  templateUrl: './ok-cancel.component.html',
  styleUrls: ['./ok-cancel.component.scss']
})
export class OkCancelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
