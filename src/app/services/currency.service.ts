import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

 public currency: BehaviorSubject<string> = new BehaviorSubject("UAH");

  constructor(
    private http: HttpClient
  ) { }

  getTrendingCurrency(currency: string, page: number): Observable<any> {
    const params = new HttpParams()
    .set("vs_currency", currency)
    .set("order", "market_cap_desc")
    .set("per_page", page)
    .set("page", 1)
    .set("sparkline", false)
    return this.http.get(`${environment.currencyUrl}/markets`, {params: params})
  }

  getCurrency() {}
}
