import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  selectedCurrency: string = "UAH";
  constructor() { }

  ngOnInit(): void {
  }

  chooseCurrency(event: any) {
    console.log(event)
  }
}
