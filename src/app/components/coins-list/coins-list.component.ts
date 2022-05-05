import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {
  currencies!: any;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.initTrendingCurrency()
  }

  initTrendingCurrency() {
    this.currencyService.getTrendingCurrency("UAH")
    .subscribe(res => {
      this.currencies = res;
      console.log(res)
    })
  }
}
