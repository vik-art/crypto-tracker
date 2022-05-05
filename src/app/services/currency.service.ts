import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient
  ) { }

  getTrendingCurrency(currency: string) {
    const params = new HttpParams()
    .set("vs_currency", currency)
    .set("order", "market_cap_desc")
    .set("per_page", 10)
    .set("page", 1)
    .set("sparkline", false)
    return this.http.get(`${environment.currencyUrl}/markets`, {params: params})
  }

  getCurrencyList(){}

  getCurrency() {}
}
