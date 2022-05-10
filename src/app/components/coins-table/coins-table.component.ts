import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Coins } from 'src/app/common/interfaces/coins.interface';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit {
  currenciesInTable!: Array<Coins>;
  currentValue: string = "UAH";
  displayedColumns: string[] = ['id', 'name', 'progress', 'price', 'updated'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private currencyService: CurrencyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCurrenciesInTable()
  }

  initCurrenciesInTable() {
    this.currencyService.currency.subscribe(res => {
      this.currentValue = res;
    })
    this.currencyService.getTrendingCurrency(this.currentValue, 100)
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

  chooseCoin(id: string) {
    this.router.navigate(["/details", id])
  }
}
