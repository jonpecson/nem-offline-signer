import { WalletProvider } from "./../../../providers/wallet/wallet";
import { Component } from "@angular/core";
import {
  IonicPage,
  ViewController,
  NavController,
  NavParams
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  UserProvider,
  LoadingProvider,
  ToastProvider
} from "../../../providers/providers";
import { TranslateService } from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: "page-account-profile",
  templateUrl: "profile.html"
})
export class AccountProfilePage {
  public form: FormGroup;
  wallet: any;

  constructor(
    private walletProvider: WalletProvider,
    public view: ViewController,
    private translate: TranslateService,
    private loader: LoadingProvider,
    private toast: ToastProvider,
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.form = this.fb.group({
      network: ["", Validators.required],
      name: ["", Validators.required],
      privateKey: ["", Validators.required]
    });

    this.walletProvider
      .getCurrentUser()
      .then(res => {
        // let _user = JSON.stringify(user);
        if (res) {
          console.log("Account user", res);
          this.wallet = JSON.parse(res.toString());
          this.form.controls["network"].setValue(this.wallet.network);
          this.form.controls["name"].setValue(this.wallet.name);
          this.form.controls["privateKey"].setValue(this.wallet.privateKey);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  submit() {
    this.loader.present();

    // Get form value
    this.wallet.network = this.form.value.network;
    this.wallet.name = this.form.value.name;
    this.wallet.privateKey = this.form.value.privateKey;

    // Save changes to wallet
    this.walletProvider
      .saveCurrentUser(this.wallet, this.navParams.data.tabIndex)
      .then(x => {
        this.translate.get(['PROFILE_UPDATED']).subscribe( x=> {
          this.toast.show(x.PROFILE_UPDATED);
        });
        this.loader.dismiss();
        this.dismiss();
      })
    }

    dismiss() {
    return this.view.dismiss();
  }

}
