import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import CryptoJS from "crypto-js";
import { AppGlobal } from '../../app/app.global';

/*
  Generated class for the SecureStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SecureStorageProvider {
  SECRET_KEY: any = AppGlobal.secretKey;

  constructor(private storage: Storage) {
    console.log('Hello SecureStorageProvider Provider');
  }

  set(key, value) : Promise<any> {

    // 1. Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.SECRET_KEY
    );

    // 2. Save to storage
    return new Promise((resolve, reject) => {
      this.storage.set(key, ciphertext.toString()).then(res=> {
        resolve(res);
      })
    });

  }

  get(key) : Promise<any> {

    return new Promise((resolve, reject) => {
      // 1. Get data from storage
      this.storage.get(key).then(res => {
        // 2. Decrypt
        if (res) {
          var bytes = CryptoJS.AES.decrypt(res, this.SECRET_KEY);
          var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          resolve(JSON.stringify(decryptedData));
        } else {
          resolve(null);
        }
      });
    });

  }

}
