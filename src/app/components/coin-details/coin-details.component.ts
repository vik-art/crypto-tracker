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
  days: number = 30;
  currency!: string;
  prices!: any;
  price!: string;
  caps!: any;
  cap!: string;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: "Price Trends",
        backgroundColor: 'rgba(148, 159, 377, 0.2)',
        borderColor: '#f2f2f2',
        pointBackgroundColor: '#093d3d',
        pointHoverBorderColor: '#093d3d',
        pointHoverBackgroundColor: '#093d3d'
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
    });
    this.currencyService.getCurrencyById(this.coinId)
    .subscribe(res => {
      this.coinData = res;
      this.currencyService.currency.subscribe(res => {
        this.currency = res;
        this.prices = this.coinData.market_data.current_price;
        this.caps = this.coinData.market_data.market_cap;
        for(let price in this.prices) {
          if(price === this.currency.toLowerCase()) {
            this.price = this.prices[price];
          }
        }
        for(let cap in this.caps) {
          if(cap === this.currency.toLowerCase()) {
            this.cap = this.caps[cap]
          }
        }
        this.getGraphicalChart();
      });
    });
  }

  getGraphicalChart() {
    this.currencyService.getGraphicalCurrency(this.coinId, this.currency, this.days)
    .subscribe((res: any) => {
      setTimeout(() => {
          this.myLineChart.chart?.update();
      }, 200)
      this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
       return a[1];
      });
      this.lineChartData.labels = res.prices.map((a: any) => {
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12} : ${date.getMinutes()} PM` :
        `${date.getHours()} : ${date.getMinutes()} AM`;
        return this.days === 1 ? time : date.toLocaleDateString();
      })
    })
  }
  }


