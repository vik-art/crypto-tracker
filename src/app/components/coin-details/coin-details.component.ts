import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  coinId!: string;
  coinData!: any;

  constructor(
    private router: ActivatedRoute,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.coinId = res['id'];
    })
    this.currencyService.getCurrencyById(this.coinId)
    .subscribe(res => {
      console.log(res);
      this.coinData = res;
    })
  }

}
