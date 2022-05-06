import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {
  currencies!: any;
  currentValue!: string;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
  }  

  initTrendingCurrency(event: string) {
    this.currentValue = event;
    this.currencyService.getTrendingCurrency(event)
    .subscribe(res => {
      this.currencies = res;
    })
  }
}
