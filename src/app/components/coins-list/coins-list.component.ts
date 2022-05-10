import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss']
})
export class CoinsListComponent implements OnInit {
  currencies!: any;
  currenciesInTable!: Array<any>;
  currentValue!: string;
  displayedColumns: string[] = ['id', 'name', 'progress', 'price', 'updated'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currentValue = "UAH";
    this.currencyService.getTrendingCurrency("UAH", 10)
    .subscribe(res => {
      this.currencies = res;
    })
    this.currencyService.getTrendingCurrency(this.currentValue, 100)
    .subscribe(res => {
      this.currenciesInTable = res;
      this.dataSource = new MatTableDataSource(this.currenciesInTable);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }  

  initTrendingCurrency(event: string) {
    this.currentValue = event;
    this.currencyService.getTrendingCurrency(event, 10)
    .subscribe(res => {
      this.currencies = res;
      console.log(res);
    });
    this.currencyService.getTrendingCurrency(event, 100)
    .subscribe(res => {
      this.currenciesInTable = res;
      this.dataSource = new MatTableDataSource(this.currenciesInTable);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
