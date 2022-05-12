import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coins } from '../common/interfaces/coins.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

 public currency: BehaviorSubject<string> = new BehaviorSubject("UAH");

  constructor(
    private http: HttpClient
  ) { }

  getTrendingCurrency(currency: string, page: number): Observable<Coins[]> {
    const params = new HttpParams()
    .set("vs_currency", currency)
    .set("order", "market_cap_desc")
    .set("per_page", page)
    .set("page", 1)
    .set("sparkline", false)
    return this.http.get<Coins[]>(`${environment.currencyUrl}/markets`, {params: params})
  }

  getCurrencyById(id: string): Observable<any> {
    return this.http.get(`${environment.currencyUrl}/${id}`)
  }

  getGraphicalCurrency(id: string, currency: string, days: string) {
    const params = new HttpParams()
    .set("vs_currency", currency)
    .set("days", days)
    return this.http.get(`${environment.currencyUrl}/${id}/market_chart`, {params: params})
  }
}
