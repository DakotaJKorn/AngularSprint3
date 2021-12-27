import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalStock } from './stock/personalStock.model';
import { Stock } from './stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockInformationService {

  allStocks: Stock[] = [{name: "Apple", symbol: "AAPL", value: 117.63},{name: "Tesla", symbol: "TSLA", value: 1111.45},
  {name: "Amazon", symbol: "AMZN", value: 3424.95}, {name: "Microsoft", symbol: "MSFT", value: 340.4}];

  constructor(private http:HttpClient) { 
    this.sortStocks();
  }

  getStockPriceAPI(symbol:string){
    return this.http.get<any>("https://financialmodelingprep.com/api/v3/quote-short/"+symbol+"?apikey=e1396cea6d353ea3b4b9f55526741492");
  }

  getStockPricesFromAPI(){

    for(let i = 0; i <this.allStocks.length; i++){
      this.getStockPriceAPI(this.allStocks[i].symbol).subscribe(response =>{
        this.allStocks[i].value = response[0].price;
      });
    }

    console.log(this.allStocks);
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
