import { Injectable } from '@angular/core';
import { Account } from './account/account.model';

@Injectable({
  providedIn: 'root'
})
export class ShareAccountsService {

  accounts: Account[] = [];

  constructor() { }

  setAccounts(accounts: Account[]){
    this.accounts = accounts;
  }

  getAccounts():Account[]{
    return this.accounts;
  }


}
