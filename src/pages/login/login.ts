import { Component, ViewChild } from "@angular/core";
import {
  AlertController,
  App,
  NavParams,
  ViewController,
  Slides,
  IonicPage,
  NavController
} from "ionic-angular";
import {
  UserProvider,
  ToastProvider,
  LoadingProvider,
  WalletProvider
} from "../../providers/providers";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import CryptoJS from "crypto-js";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  @ViewChild("slider") slider: Slides;
  @ViewChild("innerSlider") innerSlider: Slides;
  selectedNetwork: any;

  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public resetForm: FormGroup;

  constructor(
    private nav: NavController,
    private fb: FormBuilder,
    private translate: TranslateService,
    private navParams: NavParams,
    private toast: ToastProvider,
    public user: UserProvider,
    public loader: LoadingProvider,
    public alertCtrl: AlertController,
    public app: App,
    public viewCtrl: ViewController,
    private walletProvider: WalletProvider
  ) {

    this.loginForm = this.fb.group({
      name: ["", Validators.required],
      pass: ["", Validators.required]
    });

    this.signupForm = this.fb.group({
      network: ["", Validators.required],
      name: ["", Validators.required],
      privateKey: ["", Validators.required],
      pass: ["", Validators.required],
      pass2: ["", Validators.required]
    });

    this.resetForm = this.fb.group({
      name: ["", Validators.email]
    });
  }

  goToLogin() {
    this.slider.slideTo(1);
  }

  goToSignup() {
    this.slider.slideTo(2);
    // // Encrypt
    // let key = "secret key 123";
    // let ciphertext = CryptoJS.AES.encrypt("my message", key);
    // console.log(ciphertext.toString());

    // // Decrypt
    // let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    // let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(plaintext);

    // var data = [{id: 1}, {id: 2}]

    // // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');

    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // console.log(decryptedData);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  submitSignup() {
    this.loader.present();
    // Test a Wallet Service
    //  var newWallet= {'walletName': 'john', 'password':'123'};
    this.walletProvider.add(this.signupForm.value).then(res => {


      this.walletProvider
        .saveCurrentUser(res, this.navParams.data.tabIndex)
        .then(x => {
          // console.log(x);
          this.translate
            .get(["REGIST_SUCCESS"], {
              value: this.signupForm.value.name
            })
            .subscribe(x => {
              this.toast.show(x.REGIST_SUCCESS);
            });
          // this.dismiss();
          this.loader.dismiss();
          this.nav.setRoot('TabsPage')
        });
    });

  }

  submitReset() {
    this.loader.present();
    this.user
      .reset(this.resetForm.value)
      .map(res => res.json())
      .subscribe(
        res => {
          if (res.status == "ok") this.toast.show(res.msg);
          else this.toast.show(res.error);
          this.loader.dismiss();
        },
        err => {
          this.loader.dismiss();
          this.toast.show(err.json().error);
        }
      );
  }

  submitLogin() {
    this.loader.present();

    this.walletProvider.login(this.loginForm.value.name, this.loginForm.value.pass).then(res => {
        console.log(res);

       if(res) {
        this.walletProvider.saveCurrentUser(res, 1).then(()=> {
          this.translate
            .get(["LOGIN_SUCCESS"], {
              value: this.loginForm.value.name
            })
            .subscribe(x => {
              this.toast.show(x.LOGIN_SUCCESS);
            });
          // this.dismiss();
          this.loader.dismiss();
          this.nav.setRoot('TabsPage');
        })
         }
      }).catch(err=> {
        this.loader.dismiss();
        this.toast.show(err);
      });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
