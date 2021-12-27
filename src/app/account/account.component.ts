import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from './account.model';
import { Stock } from '../stock/stock.model';
import { SharedDataService } from '../shared-data.service';
import { PersonalStock } from '../stock/personalStock.model';
import { StockInformationService } from '../stock-information.service';
import { ShareAccountsService } from '../share-accounts.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  account:Account = {name:"", value:0, cashAvailable:0 , stocks:[], stockValue:0, id:0, imageUrl:""};

  totalAmount: number = 0;
  
  buyingBackground: Boolean = false;
  sellingBackground: Boolean = false;
  accountNameEdit: Boolean = false;
  accountNameValue: Boolean = true;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(private route:ActivatedRoute, private accountService:AccountService, private sharedData:SharedDataService, 
              private stockService:StockInformationService, private shareAccounts: ShareAccountsService) {
              }

  ngOnInit(): void {
    let a = localStorage.getItem('account') || "";
    let b = JSON.parse(a);
    if(b != ""){
      this.account = b;
      this.sharedData.setAccount(b);
    }


    this.route.params.subscribe(params =>{
      const myid = params['id'];

    for(let Account of this.shareAccounts.getAccounts()){
        if(Account.id == myid){
          this.account = Account;
          this.sharedData.setAccount(Account);
          let stringifiedAccount = JSON.stringify(this.account);
          localStorage.setItem('account', stringifiedAccount);
          break;
        }
      }
    });

    
  }


    toggleBuyingBackground(){
      this.sellingBackground = false;
      this.buyingBackground = !this.buyingBackground;
    }

    toggleSellingBackground(){
      this.buyingBackground = false;
      this.sellingBackground = !this.sellingBackground;
    }

    doubleClick(){
      this.accountNameEdit = true;
      this.accountNameValue = false;
      let a = (<HTMLInputElement>document.getElementById("editAccountName"));
      let name = this.account.name;

      setTimeout(function(){
        let b = (<HTMLInputElement>a.childNodes[0]);
        b.value = name;
        b.focus();
    }, 1);
      
    }

    editAccountBlurred(){
      let nameEdit = (<HTMLInputElement>document.getElementById("editAccount")).value;

      if(!(nameEdit == this.account.name)){
        this.account.name = nameEdit;
      }

      this.accountService.updateAccount(this.account).subscribe(response =>{
        //console.log(response);
      });

      this.accountNameEdit = false;
      this.accountNameValue = true;
    }
}
