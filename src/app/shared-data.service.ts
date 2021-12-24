import { Injectable, OnInit } from '@angular/core';
import { AccountTableComponent } from './account-table/account-table.component';
import { Account } from './account/account.model';
import { StockInformationService } from './stock-information.service';
import { Stock } from './stock/stock.model';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  account:Account = {name:"", value:0, cashAvailable:0 ,stocks:[], stockValue:0, id:0, imageUrl:""};
  allStocks: Stock[] = [];
  accountTable: any;
  sortBy:string = "name";
  reverse:Boolean = true;
  stockValue = 0;

  constructor(private stockInformation: StockInformationService) {
    this.allStocks = stockInformation.getAllStocks();
    this.sortAllStocks();
   }
  
  setStockValue(value:number){
    this.stockValue = value;
  }

  setAccount(account:Account){
    this.account = account;
    this.sortAccountStocksBy('name');
  }

  setStocks(stocks:Stock[]){
    
    this.allStocks = stocks;
  }

  setAccountTable(accountTable:AccountTableComponent){
    this.accountTable = accountTable;
  }
  
  
sortAccountStocks(){

    if(this.sortBy == "name"){
      this.account.stocks.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
  
    if(this.sortBy == "symbol"){
      this.account.stocks.sort((a, b) => {
        let fa = a.symbol.toLowerCase(),
            fb = b.symbol.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
    }
  
    if(this.sortBy == "amount"){
      this.account.stocks.sort((a, b) => {
        return b.amount - a.amount;
    });
      
    }
  }

  sortAccountStocksBy(attribute:string){

  //Sort by name
  if(attribute == "name" && this.sortBy != "name"){
    this.reverse = false;

    this.account.stocks.sort((a, b) => {
      let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });
  }

  if(attribute == "name" && this.sortBy == "name"){

    if(this.reverse == true){
      this.account.stocks.sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
      this.reverse = false;
    }
      else{
        this.account.stocks.sort((a, b) => {
          let fa = a.name.toLowerCase(),
              fb = b.name.toLowerCase();
      
          if (fa < fb) {
              return 1;
          }
          if (fa > fb) {
              return -1;
          }
          return 0;
        });
        this.reverse = true;
      }
    
  }


  //Sort by symbol
  if(attribute == "symbol" && this.sortBy != "symbol"){
    this.account.stocks.sort((a, b) => {
      let fa = a.symbol.toLowerCase(),
          fb = b.symbol.toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });

    this.reverse = false;
  }

  if(attribute == "symbol" && this.sortBy == "symbol"){

    if(this.reverse == true){
      this.account.stocks.sort((a, b) => {
        let fa = a.symbol.toLowerCase(),
            fb = b.symbol.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
      });
  
      this.reverse = false;
    }
    else{
      this.account.stocks.sort((a, b) => {
        let fa = a.symbol.toLowerCase(),
            fb = b.symbol.toLowerCase();
    
        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
      });
  
      this.reverse = true;
    }

  }


  //Sort by amount
  if(attribute == "amount" && this.sortBy != "amount"){
    this.account.stocks.sort((a, b) => {
      return b.amount - a.amount;
  });

  this.reverse = false;
    
  }


  if(attribute == "amount" && this.sortBy == "amount"){

    if(this.reverse == true){
      this.account.stocks.sort((a, b) => {
        return b.amount - a.amount;
    });
  
      this.reverse = false;
    }
    else{
      this.account.stocks.sort((a, b) => {
        return a.amount - b.amount;
    });
  
      this.reverse = true;
    }

    
  }



  //SORT BY CURRENT PRICE AND VALUE




  //Sets the sort by variable to the selected attribute
  this.sortBy = attribute;
}

sortAllStocks(){
  this.allStocks.sort((a, b) => {
    let fa = a.symbol.toLowerCase(),
        fb = b.symbol.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
}




}
