import { Component, Input, OnInit } from '@angular/core';
import { share } from 'rxjs';
import { Account } from '../account/account.model';
import { ShareAccountsService } from '../share-accounts.service';
import { SharedDataService } from '../shared-data.service';
import { StockInformationService } from '../stock-information.service';
import { Stock } from '../stock/stock.model';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit {

  @Input() account:Account = {name:"", value:0, cashAvailable:0 ,stocks:[], stockValue:0, id:0, imageUrl:""};
  stocks:Stock[] = []
  stockValue: number = 0;
  
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(private sharedData:SharedDataService, private stockInformation: StockInformationService, private shareAccount: ShareAccountsService) { }

  ngOnInit(): void {
    this.stocks = this.stockInformation.allStocks;
    this.account = this.sharedData.account;
    this.sharedData.setAccountTable(this);
    
  }
  
  getStockPrice(symbol:String):number{
    return this.stockInformation.getStockPrice(symbol);
  }

  sortStocks(attribute:string){
    this.sharedData.sortAccountStocksBy(attribute);
  }

  updateStocks(){
    this.account = this.sharedData.account;
    this.stockValue = this.account.stockValue;
  }
}
