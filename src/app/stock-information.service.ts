import { Injectable } from '@angular/core';
import { PersonalStock } from './stock/personalStock.model';
import { Stock } from './stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockInformationService {

  allStocks: Stock[] = [{name: "Apple", symbol: "AAPL", value: 172.97},{name: "Tesla", symbol: "TSLA", value: 938.00},
  {name: "Amazon", symbol: "AMZN", value: 3407.58}, {name: "Microsoft", symbol: "MSFT", value: 335.92}];


  constructor() { 
    this.sortStocks();
  }

  getAllStocks(){
    return this.allStocks;
  }

  sortStocks(){
    this.allStocks.sort((a, b) => {
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

  getStocksValue(stocks:PersonalStock[]):number{
    return this.getTotalValue(stocks);
  }

  private getTotalValue(stocks: PersonalStock[]):number{
    let returnValue = 0;
    for(let stock of stocks){
      returnValue += this.getStockPrice(stock.symbol)*stock.amount;
    }
    return(returnValue);
  }

  getStockPrice(Symbol:String):number{
    for(let stock of this.allStocks){
      if(stock.symbol == Symbol){
        return stock.value;
      }
    }
    return 0;
  }

}
