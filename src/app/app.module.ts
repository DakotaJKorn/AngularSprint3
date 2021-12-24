import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { StocksComponent } from './stocks/stocks.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountTableComponent } from './account-table/account-table.component';
import { BuyStockComponentComponent } from './buy-stock-component/buy-stock-component.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { MatCardModule } from '@angular/material/card';
import { AddAccountComponent } from './add-account/add-account.component';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StocksComponent,
    AccountsComponent,
    AccountComponent,
    AccountTableComponent,
    BuyStockComponentComponent,
    SellStockComponent,
    AccountCardComponent,
    AddAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
