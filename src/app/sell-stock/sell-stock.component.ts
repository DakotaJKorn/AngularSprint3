import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account/account.model';
import { SharedDataService } from '../shared-data.service';
import { Stock } from '../stock/stock.model';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.scss']
})
export class SellStockComponent implements OnInit {

  stocks:Stock[] = [];
  account:Account = {name:"", value:0, cashAvailable:0 ,stocks:[], stockValue:0, id:0, imageUrl:""};
  accountTableComponent: any = '';

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  sellingAmount:number = 0;
  stockSelection = "";
  stockAmount = 0;

  constructor(private accountService: AccountService, private sharedData:SharedDataService) { }

  ngOnInit(): void {
    this.accountTableComponent = this.sharedData.accountTable;
    this.account = this.sharedData.account;
    this.stocks = this.sharedData.allStocks;
  }

  checkIfPositiveWholeNumber(){
    let Value = parseFloat((<HTMLInputElement>document.getElementById('buyingStockAmount')).value);

    if(!(Number.isInteger(Value) && Value > 0)){
      (<HTMLInputElement>document.getElementById('buyingStockAmount')).value = "";
    }

    this.printAmount();
  }

  printAmount(){
    
    let amount: number = parseInt((<HTMLInputElement>document.getElementById('buyingStockAmount')).value); 
    let stockOptionsElement = (<HTMLSelectElement>document.getElementById("stockOptions"));
    let stockOptionsValue =(stockOptionsElement.options[stockOptionsElement.selectedIndex].text);
    this.stockSelection = stockOptionsValue;
    this.stockAmount = amount;

    let value:number = 0;
    for(let stock of this.stocks)
    {
      if(stock.symbol == stockOptionsValue){
        value = stock.value;
      }
    }
    
    if(!isNaN(amount * value)){
      this.sellingAmount = amount * value;
    }
  }



  sellStock(){
      let amount = 0;
      let selectedStock:any = "";

      for(let stock of this.account.stocks){
        if (stock.symbol == this.stockSelection){
          amount = stock.amount;
          selectedStock = stock;
        }
      }

      if(this.sellingAmount <= 0)
        alert("You must sell at least one stock.");
      else if(amount < this.stockAmount){
        alert("You are trying to sell more stock than you own.");
      }
      else{
        alert("Stock sold.");
        
        selectedStock.amount -= this.stockAmount;
        this.account.cashAvailable += this.sellingAmount;
        this.account.stockValue -= this.sellingAmount;

        for(let i = 0; i<this.account.stocks.length; i++){
          if(this.account.stocks[i].amount < 1){
            this.account.stocks.splice(i,1);
          }
        }
        
        this.sharedData.account = this.account;
        this.sharedData.updateLocalStorage();

        this.accountService.updateAccount(this.account).subscribe(response =>{
          //console.log(response);
        });
        
        this.accountTableComponent.updateStocks();
      }
    }
}
