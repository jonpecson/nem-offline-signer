import { SecureStorageProvider } from "./../secure-storage/secure-storage";
import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";
import CryptoJS from "crypto-js";
import { AppGlobal } from "../../app/app.global";

/*
  Generated class for the WalletProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class WalletProvider {
  private wallets: Array<any> = [];
  private CURRENT_USER_KEY: string = "current_user";
  private WALLETS_KEY: string = "wallets";
  user: any;
  SECRET_KEY: any = AppGlobal.secretKey;
  private isLoggedIn = false;

  constructor(
    private events: Events,
    private storage: Storage,
    private secureStorage: SecureStorageProvider
  ) {
    // console.log('Hello WalletProvider Provider');
  }

  add(wallet) {
    this.log("adding a wallet");
    console.log(wallet);

    return new Promise((resolve, reject) => {
      // get wallet from storage
      this.secureStorage.get(this.WALLETS_KEY).then(wallets => {
        if (wallets) {
          console.log("get wallet from storage", wallets);
          this.wallets = JSON.parse(wallets);
        }

        // encrypt password
        wallet.encryptedPassword = CryptoJS.SHA1(wallet.pass).toString();
        delete wallet.pass;
        delete wallet.pass2;

        // add new wallet to wallet array
        this.wallets.push(wallet);
        console.log("add new wallet", JSON.stringify(this.wallets));

        // save new wallet to storage
        this.secureStorage.set(this.WALLETS_KEY, this.wallets).then(res => {
          console.log("push new update to storage", res);
          resolve(wallet);
          this.log("new wallet added");
        });
      });
    });
  }

  login(name, password) {
    this.log("authenticating user");
    return new Promise((resolve, reject) => {
      this.find(name).then(wallet => {
        if (wallet) {
          console.log("found wallet", wallet);
          let _wallet = wallet[0];
          let _encryptedPassword = CryptoJS.SHA1(password).toString();
          console.log(_encryptedPassword);
          if (_wallet.encryptedPassword == _encryptedPassword) {
            resolve(_wallet);
          } else {
            reject('Incorrect password.')
          }
        } else {
          reject('Wallet not found.')
        }
      });
    });
  }

  find(name): Promise<any> {
    this.log("finding a wallet");
    return new Promise((resolve, reject) => {
      // get wallet from storage
      this.secureStorage.get(this.WALLETS_KEY).then(wallets => {
        if (wallets) {
          this.wallets = JSON.parse(wallets);
        }

        // find a wallet
        let wallet = this.wallets.filter(w => {
          return w.name === name;
        });
        if(wallet.length>0) {
          resolve(wallet);
        } else {
          resolve(null);
        }

      });
    });
  }

  saveCurrentUser(user, index) {
    return new Promise((resolve, reject) => {
      // this.events.publish("user:login", { user: user });
      this.secureStorage.set(this.CURRENT_USER_KEY, user).then(res=> {
        resolve(res);
      })

    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      // 1. Get data from storage
      this.secureStorage.get(this.CURRENT_USER_KEY).then(user => {
        // 2. Decrypt
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in')
        }
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.storage.remove(this.CURRENT_USER_KEY).then(res=> {
        resolve(res);
      })
    });
  }

  log(msg) {
    console.log("Wallet service: " + msg);
  }
}
