import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../account/account.model';
import { Stock } from '../stock/stock.model';
import { AccountService } from '../account.service';
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-buy-stock-component',
  templateUrl: './buy-stock-component.component.html',
  styleUrls: ['./buy-stock-component.component.scss']
})
export class BuyStockComponentComponent implements OnInit {

  stocks:Stock[] = [];
  account:Account = {name:"", value:0, cashAvailable:0 ,stocks:[], stockValue:0, id:0, imageUrl:""};
  accountTableComponent: any = '';

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  buyingCost:number = 0;
  redText = false;
  stockSelection = "";
  stockAmount = 0;

  constructor(private accountService: AccountService, private sharedData:SharedDataService) { }

  ngOnInit(): void {
    this.accountTableComponent = this.sharedData.accountTable;
    this.stocks = this.sharedData.allStocks;
    this.account = this.sharedData.account;
  }

  checkIfPositiveWholeNumber(){
    let Value = parseFloat((<HTMLInputElement>document.getElementById('buyingStockAmount')).value);

    if(!(Number.isInteger(Value) && Value > 0)){
      (<HTMLInputElement>document.getElementById('buyingStockAmount')).value = "";
    }

    this.printCost();
  }

  printCost(){
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
      if(amount*value <= this.account.cashAvailable){
        this.redText = false;
      }
        if(amount*value > this.account.cashAvailable){
          this.redText = true;
        }
      this.buyingCost = amount * value;
    }
  }

  buyStock(){
      if(this.buyingCost > this.account.cashAvailable )
        alert("Not enough cas available to purchase stock.");
      
      else if(this.buyingCost == 0)
        alert("You must purchase at least one stock.");

      else{
        alert("Stock Purchased");
        this.account.cashAvailable -= this.buyingCost;
        this.account.stockValue += this.buyingCost;

        let isInStocks = false;
        for(let stock of this.account.stocks){
          if(stock.symbol == this.stockSelection){
            stock.amount += this.stockAmount;
            isInStocks = true;
          }
        }

        if(!isInStocks){
          for(let stock of this.stocks)
          if(this.stockSelection == stock.symbol)
            this.account.stocks.push({name:stock.name,symbol:stock.symbol, amount:this.stockAmount});
        }

        if(this.buyingCost > this.account.cashAvailable)
          this.redText = true;

          let stringifiedAccount = JSON.stringify(this.account);
          localStorage.setItem('account',stringifiedAccount);

        this.accountService.updateAccount(this.account).subscribe(response =>{
          //console.log(response);
        });

        this.accountTableComponent.updateStocks();

      }
  }
}
