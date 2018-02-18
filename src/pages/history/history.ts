import { TransactionProvider } from "./../../providers/transaction/transaction";
import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-history",
  templateUrl: "history.html"
})
export class HistoryPage {
  status: string = "pending";

  histories = [];
  total: number = 0;
  img = "https://nem.io/wp-content/uploads/2017/07/icon-get-xem.png";

  constructor(
    private translate: TranslateService,
    private nav: NavController,
    private transactionHistory: TransactionProvider
  ) {
    // this.transactionHistory
    //   .create({
    //     addr: "NAM2CFHIJNA6S3GMT5GIXDRHYGG33KBJBKCUOFCX",
    //     amount: "10",
    //     msg: "Test Invoice",
    //     name: "John",
    //     timestamp:  Date.now()
    //   })
    //   .then(res => {
    //     console.log("New transaction added: " + res);
    //   });


  }

  ionViewWillEnter() {
    this.transactionHistory.getAll().then(res => {
      let _histories = JSON.stringify(res);
      this.histories = JSON.parse(_histories);

      if (this.histories.length > 0) {
        let sum = this.histories
          .map(x => {
            return x.amount;
          })
          .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr));
        this.total = sum;
        console.log("Total: " + sum);
      }
    });
  }

  goHome() {
    this.nav.parent.select(0);
  }
}
