import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account/account.model';
import { Stock } from '../stock/stock.model';
import { StockInformationService } from '../stock-information.service';
import { SharedDataService } from '../shared-data.service';
import { ShareAccountsService } from '../share-accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  
  accounts:Account[] = []; 
  allStocks: Stock[] = [];
  
  constructor(private accountService:AccountService, private stockInformationService: StockInformationService, private shareAccounts: ShareAccountsService) { 
    this.allStocks = stockInformationService.getAllStocks();
  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(response =>{
      this.accounts = response;
      this.shareAccounts.setAccounts(this.accounts);  
    });
  }

}
