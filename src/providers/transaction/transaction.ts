import { SecureStorageProvider } from './../secure-storage/secure-storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {

  TRANSACTIONS_KEY = "transaction";
  transactions = [];

  constructor(private secureStorage: SecureStorageProvider) {
    console.log('Hello TransactionProvider Provider');
  }

  log(msg) {
    console.log("transaction service: " + msg);
  }

  getAll() {
    return new Promise((resolve, reject) => {
      // get transaction from storage
      this.secureStorage.get(this.TRANSACTIONS_KEY).then(transactions => {
        if (transactions) {
          // console.log("get transaction from storage", transactions);
          // this.transactions = JSON.parse(transactions);
          resolve(JSON.parse(transactions));
        } else {
          resolve([])
        }
      })
    })
  }

  create(transaction) {
    this.log("adding a transaction");

    return new Promise((resolve, reject) => {
      // get transaction from storage
      this.secureStorage.get(this.TRANSACTIONS_KEY).then(transactions => {

        if (transactions) {
          console.log("get transaction from storage", transactions);
          this.transactions = JSON.parse(transactions);
        }

        // add new transaction to transaction array
        this.transactions.push(transaction);
        console.log("list of current transactions", JSON.stringify(this.transactions));

        // save new transaction to storage
        this.secureStorage.set(this.TRANSACTIONS_KEY, this.transactions).then(res => {
          console.log("new transaction added", res);
          resolve(transaction);
        });
      });
    });
  }

}
