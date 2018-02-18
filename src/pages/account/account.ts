import { WalletProvider } from "./../../providers/wallet/wallet";
import { Component } from "@angular/core";
import { EmailComposer } from "@ionic-native/email-composer";
import { AppRate } from "@ionic-native/app-rate";
import { AppVersion } from "@ionic-native/app-version";
import {
  App,
  IonicPage,
  AlertController,
  ModalController,
  Platform,
  NavController,
  NavParams
} from "ionic-angular";
import {
  UserProvider,
  NotifProvider,
  AddressProvider
} from "../../providers/providers";
import { AppGlobal } from "../../app/app.global";
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: "page-account",
  templateUrl: "account.html"
})
export class AccountPage {
  notif: any;
  address: any;
  user: any;

  constructor(
    private appCtrl: App,
    private emailComposer: EmailComposer,
    private appVersion: AppVersion,
    private appRate: AppRate,
    private translate: TranslateService,
    private alert: AlertController,
    private platform: Platform,
    private _notif: NotifProvider,
    public navCtrl: NavController,
    private _address: AddressProvider,
    private modal: ModalController,
    private _user: UserProvider,
    public navParams: NavParams,
    private walletProvider: WalletProvider
  ) {
    this.notif = this._notif;
    this.address = this._address;
    // this.user = this._user;



    }

  ionViewDidLoad() {}

  ionViewDidEnter() {

    this.getCurrentUser();
  }

  rateUs() {
    if (!this.platform.is("cordova")) {
      this.translate
        .get(["OK", "ONLY_DEVICE", "ONLY_DEVICE_DESC"])
        .subscribe(x => {
          this.alert
            .create({
              title: x.ONLY_DEVICE,
              message: x.ONLY_DEVICE_DESC,
              buttons: [{ text: x.OK }]
            })
            .present();
          return false;
        });
    } else {
      this.appVersion.getAppName().then(res => {
        this.appRate.preferences.displayAppName = res;
      });

      this.appVersion.getPackageName().then(res => {
        this.appRate.preferences.storeAppURL = {
          //ios: '<app_id>', // FOR IOS
          android: "market://details?id=" + res // FOR ANDROID, use your own android package name
          //windows: 'ms-windows-store://review/?ProductId=<store_id>' // FOR WINDOWS APP
        };
        this.appRate.promptForRating(true);
      });
    }
  }

  goProfile() {
    let modal = this.modal.create("AccountProfilePage")
    modal.onDidDismiss(() => {
      this.getCurrentUser();
    });
    modal.present();
  }

  goTo(page, params) {
    this.navCtrl.push(page, { params: params });
  }

  emailUs() {
    if (this.platform.is("cordova")) {
      this.emailComposer.isAvailable().then((available: boolean) => {
        // this.emailComposer.addAlias('gmail', 'com.google.android.gm');  // if you want to use gmail
        let email = {
          //app: 'gmail', // if you want to use gmail
          to: AppGlobal.ContactEmail,
          //bcc: ['john@doe.com', 'jane@doe.com'],
          //  attachments: [
          // 	 'file://img/logo.png',
          // 	 'res://icon.png',
          // 	 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
          // 	 'file://README.pdf'
          //  ],
          subject: "AppGlobal Support",
          body: "Hi, please help me.",
          isHtml: true
        };

        this.emailComposer.open(email);
      });
    } else {
      this.translate
        .get(["ONLY_DEVICE", "ONLY_DEVICE_DESC", "OK"])
        .subscribe(x => {
          this.alert
            .create({
              title: x.ONLY_DEVICE,
              message: x.ONLY_DEVICE_DESC,
              buttons: [
                {
                  text: x.OK
                }
              ]
            })
            .present();
        });
    }
  }

  login() {
    this.modal.create("LoginPage", {}).present();
  }

  getCurrentUser() {
    this.walletProvider
      .getCurrentUser()
      .then(res => {
        // let _user = JSON.stringify(user);
        if (res) {
          console.log("Account user", res);
          this.user = JSON.parse(res.toString());
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  logout() {
    this.walletProvider.logout().then(()=> {

      this.appCtrl.getRootNav().setRoot('LoginPage');
  // this.navCtrl.popToRoot();

          // this.navCtrl.popTo('LoginPage').then(() =>{
          //     return;
          // }).catch((err)=> {
          //   console.log(err);
          //   return;
          // }) ;

        // this.navCtrl.setRoot('LoginPage');

    })



  }

  ionViewWillLeave(){

   }
}
