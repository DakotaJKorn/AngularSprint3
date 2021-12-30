import { Injectable } from '@angular/core';
import { Account } from './account/account.model';

@Injectable({
  providedIn: 'root'
})
export class ShareAccountsService {

  accounts: Account[] = [];

  constructor() {
    if(localStorage.getItem("accounts")){
      let acc = localStorage.getItem("accounts")||"";
      this.accounts = JSON.parse(acc);
    }
   }

  setAccounts(accounts: Account[]){
    this.accounts = accounts;
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }

  getAccounts():Account[]{
    return this.accounts;
  }

  addAccount(account:Account){
    this.accounts.push(account);
  }


}
