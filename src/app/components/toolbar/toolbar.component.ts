import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  selectedCurrency: string = "UAH";
  @Output() onChooseCurrency = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  chooseCurrency(event: string) {
    this.onChooseCurrency.emit(event)
  }
}
