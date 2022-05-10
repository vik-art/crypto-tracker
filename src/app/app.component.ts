import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private currencyService: CurrencyService) {}
  
  displayCurrency(id: string) {
   this.currencyService.currency.next(id)
  }
}
