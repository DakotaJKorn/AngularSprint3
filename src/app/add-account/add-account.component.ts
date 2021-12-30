import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account/account.model';
import { ShareAccountsService } from '../share-accounts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  constructor(private shareAccountService: ShareAccountsService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  addAccount(){

    let accounts: Account[] = this.shareAccountService.getAccounts();
    let accountIDs: number[] = new Array();

    for(let account of accounts){
      accountIDs.push(account.id);
    }

     let highestID = 0;

     for(let id of accountIDs){
       if(id > highestID)
       highestID = id;
     }

     let name:string = (<HTMLInputElement>document.getElementById("name")).value;
     let amount = parseFloat((<HTMLInputElement>document.getElementById("deposit")).value);

     let addingAccount: Account = {name:name, value:amount, cashAvailable:amount, stocks:[], stockValue:0, id:(highestID+1), imageUrl:"" };

     if(name != "" && amount > 0){
      this.accountService.addAccount(addingAccount).subscribe(response =>{
        //console.log(response);
      });
      this.shareAccountService.addAccount(addingAccount);
      alert("Account created.");
      this.router.navigateByUrl('/accounts');
     }
     else{
      alert("Please input a valid name and amount.");
     }

  }

}
