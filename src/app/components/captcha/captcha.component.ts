import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {

  tiles : { value : number, clicked : boolean, colorNotClicked : string, colorClicked : string}[] = [];

  @Output() resolvedEvent = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      let val = Math.round(Math.random())
      this.tiles.push({
        value : val,
        clicked : false,
        colorNotClicked : val == 0  ? 'rgb(154, 154, 255)' : 'rgb(157, 253, 138)',
        colorClicked : val == 0 ? 'rgb(190, 190, 253)' : 'rgb(213, 253, 190)'
      });   
    }
  }

  submitCaptcha(){
    let passed =
    this.tiles.filter(tile => 
      (tile.value == 0 && tile.clicked) || (tile.value == 1 && !tile.clicked)
    ).length == 0;
    this.resolvedEvent.emit(passed);
  }
}
