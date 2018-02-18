import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';

/**
 * Generated class for the LoaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public wallet: WalletProvider) {

      this.wallet.getCurrentUser().then(user => {
        console.log(user);
        console.error('User will be logged in');
        if(user) this.navCtrl.setRoot('TabsPage');
      }).catch(err => {
        console.error(err);
        this.navCtrl.setRoot('LoginPage');
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoaderPage');
  }

}
