import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalStock } from './stock/personalStock.model';
import { Stock } from './stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockInformationService {

  allStocks: Stock[] = [{name: "Apple", symbol: "AAPL", value: 117.63},{name: "Tesla", symbol: "TSLA", value: 1111.45},
  {name: "Amazon", symbol: "AMZN", value: 3424.95}, {name: "Microsoft", symbol: "MSFT", value: 340.4}];

  constructor(private http:HttpClient) { 
    this.getStockPricesFromAPI(this.allStocks);
    this.sortStocks();
  }

  getStockPriceAPI(symbol:string){
    return this.http.get<any>("https://financialmodelingprep.com/api/v3/quote-short/"+symbol+"?apikey=e1396cea6d353ea3b4b9f55526741492");
  }

  getStockPricesFromAPI(stocks:Stock[]){
      let responses:any[] = [];
    for(let i = 0; i <this.allStocks.length; i++){
      this.getStockPriceAPI(this.allStocks[i].symbol).subscribe(response =>{
        responses.push([response[0].symbol,response[0].price]);
      });
    }

    setTimeout(function(){
     
      for(let stock1 of stocks){
        for(let stock2 of responses){
          if(stock2[0] == stock1.symbol)
          {
            stock1.value = stock2[1];
          }
        }
      }
  }, 1000);
    console.log("All of the stocks in the system: ",this.allStocks);
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
