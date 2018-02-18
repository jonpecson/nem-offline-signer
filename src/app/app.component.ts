import { LoaderPage } from './../pages/loader/loader';
import { LoadingProvider } from './../providers/loading/loading';
import { WalletProvider } from "../providers/providers";

import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Platform /*, Config*/, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { NotifProvider, SettingsProvider } from "../providers/providers";
import { AppGlobal } from "./app.global";


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = LoaderPage;
  app: any = {};

  constructor(
    private walletProvider: WalletProvider,
    private notif: NotifProvider,
    private platform: Platform,
    public settings: SettingsProvider,
    private translate: TranslateService,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {

    // this.walletProvider.getCurrentUser().then(user => {
    //   if (user) {
    //     console.log("Logging in user");
    //     this.rootPage = "TabsPage";
    //   }

    // }).catch(err => {
    //     console.log(err);
    //     this.rootPage = "LoginPage";
    // });

    this.settings.load().then(x => {
      this.app = x;
      this.initTranslate();
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(false);
      // this.statusBar.backgroundColorByHexString('#FF1654');
      this.splashScreen.hide();
    });
  }

  ionViewCanEnter() {}

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(
      this.app && this.app.language !== undefined
        ? this.app.language
        : AppGlobal.defaultLang
    );

    if (this.app && this.app.language !== undefined)
      this.translate.use(this.app.language);
    else this.translate.use(AppGlobal.defaultLang);
  }
}
