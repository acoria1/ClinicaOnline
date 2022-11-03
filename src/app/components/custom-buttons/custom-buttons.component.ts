import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Feature } from 'src/app/classes/feature';

@Component({
  selector: 'app-custom-buttons',
  templateUrl: './custom-buttons.component.html',
  styleUrls: ['./custom-buttons.component.scss']
})
export class CustomButtonsComponent implements OnInit {

  @Input() buttons : Feature[] = [];
  @Output() buttonClicked = new EventEmitter<Feature>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonSelected(button : Feature){
    this.buttonClicked.emit(button);
  }

}
