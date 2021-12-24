import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  getAccounts(): Observable<any>{
    return this.http.get<any>("http://localhost:8082/api/funds");
  }

  getAccount(id: string): Observable<any>{
    return this.http.get<any>("http://localhost:8082/api/funds/" + id);
  }

  updateAccount(account:Account){
    return this.http.put<any>("http://localhost:8082/api/funds/" + account.id,account);
  }
}
