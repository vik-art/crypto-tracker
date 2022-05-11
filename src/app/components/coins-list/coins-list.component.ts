import { Component, OnInit } from '@angular/core';
import { mergeMap, pipe, switchMap } from 'rxjs';
import { Coins } from 'src/app/common/interfaces/coins.interface';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {
  currencies!: Array<Coins>;
  currentValue!: string;

  constructor(
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.initTrendingCurrency();
  }  

  initTrendingCurrency() {
    this.currencyService.currency.subscribe(res => {
      this.currentValue = res;
    })
    this.currencyService.getTrendingCurrency(this.currentValue, 10)
    .subscribe(res => {
      this.currencies = res;
    });
  }
}
