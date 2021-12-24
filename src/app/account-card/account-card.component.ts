import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../account/account.model';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit {

  @Input() account:Account = {name:"", value:0, cashAvailable:0 ,stocks:[],  stockValue:0, id:0, imageUrl:""};
  @Input() imageSrc = this.account.imageUrl;

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  constructor(sharedData: SharedDataService) {
    sharedData.account = this.account;
   }

  ngOnInit(): void {
  }

}

