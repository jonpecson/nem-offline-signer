import { WalletProvider } from './../../providers/wallet/wallet';
import { TransactionProvider } from "./../../providers/transaction/transaction";
import { NemProvider } from "./../../providers/nem/nem";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  ModalController,
  NavParams
} from "ionic-angular";
import { ModalContentPage } from "./modal";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { ToastProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: "page-invoice",
  templateUrl: "invoice.html"
})
export class InvoicePage {
  addressvalid: boolean;
  amountValid: boolean;
  nemAmount: number;
  nemMessage: string;
  nemAddress: string;
  name: string;
  nameValid: boolean;
  nemPrivatekey: string;
  nemFee = "0";
  btnDisabled: boolean;
  invoice: any;

  constructor(
    private toast: ToastProvider,
    public navCtrl: NavController,
    private nemService: NemProvider,
    private modalCtrl: ModalController,
    public alrtCtrl: AlertController,
    private barcodeScnr: BarcodeScanner,
    public navParams: NavParams,
    private transactionHistory: TransactionProvider,
    private walletProvider: WalletProvider
  ) {
    // Get scanned invoice
    this.invoice = this.navParams.get("barcodeData");

    console.log("Invoice: " + this.invoice);

    // Validate invoice
    if (this.invoice) {
      let info = this.invoice;

      // Validate name
      this.name = info.name;
      this.validateName(this.name);

      // Validate address
      this.nemAddress = info.addr;
      this.validateAddress(this.nemAddress);

      // Validate amout
      this.nemAmount = parseInt(info.amount) / 1000000;
      this.nemMessage = info.msg;
      this.updateFee();
    }

    // Get stored private key

    this.walletProvider
      .getCurrentUser()
      .then(res => {
        // let _user = JSON.stringify(user);
        if (res) {
          console.log("Account user", res);
          let wallet = JSON.parse(res.toString());
          this.nemPrivatekey = wallet.privateKey;

          // Validate private key
          this.updatePrvKey(this.nemPrivatekey);
        }
      })
      .catch(err => {
        console.log(err);
      });


  }

  validateName(name) {
    if (name.length>0) {
      this.name = name;
      this.nameValid = true;
    } else {
      this.name = "";
      this.nameValid = false;
    }
  }


  validateAddress(address) {
    this.addressvalid = this.nemService.validateAddress(address);
    if (this.addressvalid)
      return (this.nemAddress = this.nemService.nemAddress = address);

    this.nemAddress = "";
    this.addressvalid = false;
  }

  updateFee() {
    let res = this.nemService.updateFee(this.nemAmount, this.nemMessage || "");
    if (res) {
      this.nemFee = this.nemService.nemFee;
      this.amountValid = res;
    } else {
      //Error alert for invalid amount
    }
  }

  updateAmount(amount) {
    this.nemAmount = amount;
    this.updateFee();
  }

  updateMessage(message) {
    this.nemMessage = message;
    this.updateFee();
  }

  updatePrvKey(prvKey) {
    this.nemService.nemPrivatekey = prvKey;
  }

  decrypt() {
    console.log("decrypt..");
  }

  openModal() {
    //Before signing, check private key field has something
    let f = document.getElementById("prvKey").getElementsByTagName("input")[0]
      .value;
    console.log(f);
    if (f == undefined || f.length == 0) {
      //Alert to enter private key
      return this.showAlert("Warning", "Enter your private key.");
    }

    let res = this.nemService.signTransaction();

    if (res.error) {
      return this.showAlert("Error", res.message);
    }

    // Save to transaction history
    this.saveTransaction();

    // Show a confirmation message
    this.toast.show('New transaction been has signed.')

    this.modalCtrl.create(ModalContentPage, { qrData: res.message }).present();
  }

  saveTransaction() {


    if(!this.invoice) {
      this.invoice = {};
      this.invoice.amount = this.nemAmount;
      this.invoice.msg = this.nemMessage;
      this.invoice.addr = this.nemAddress;
      this.invoice.name = this.name;
    }
    console.log(this.invoice);
    this.transactionHistory.create(this.invoice).then(res => {
      console.log("New transaction added: " + res);
    });
  }

  showAlert(title, message) {
    this.alrtCtrl
      .create({
        title: title,
        message: message,
        buttons: ["Ok"]
      })
      .present();
  }
}
