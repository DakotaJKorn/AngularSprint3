import { Component, Input, OnInit } from '@angular/core';
import { share } from 'rxjs';
import { Account } from '../account/account.model';
import { ShareAccountsService } from '../share-accounts.service';
import { SharedDataService } from '../shared-data.service';
import { StockInformationService } from '../stock-information.service';
import { Stock } from '../stock/stock.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit {

  @Input() account:Account = {name:"", value:0, cashAvailable:0 ,stocks:[], stockValue:0, id:0, imageUrl:""};
  stocks:Stock[] = [];

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(private sharedData:SharedDataService, private stockInformation: StockInformationService, private shareAccount: ShareAccountsService, private router:Router) { }

  ngOnInit(): void {
    this.stocks = this.stockInformation.allStocks;
    this.account = this.sharedData.account;
    this.sharedData.setAccountTable(this);
    this.updateStocks();
  }
  
  getStockPrice(symbol:String):number{
    let value = this.stockInformation.getStockPrice(symbol);
    return value;
  }

  sortStocks(attribute:string){
    this.sharedData.sortAccountStocksBy(attribute);
  }

  updateStocks(){
    this.account = this.sharedData.account;
    this.account.value = this.account.cashAvailable + this.account.stockValue;
    this.router.navigateByUrl(this.router.url);
  }
}