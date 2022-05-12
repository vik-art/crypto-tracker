import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';
import { ChartConfiguration, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {
  coinId!: string;
  coinData!: any;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: "Price Trends",
        backgroundColor: 'rgba(148, 159, 377, 0.2)',
        borderColor: '#f2f2f2',
        pointBackgroundColor: '#f3f3f3',
        pointHoverBorderColor: '#f2f2f2',
        pointHoverBackgroundColor: '#f2f2f2'
      }
    ],
    labels: []
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      }
    },
    scales: {},
    plugins: {
      legend: {display: true}
    }
  }

  public lineChartType: ChartType = "line";
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

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
