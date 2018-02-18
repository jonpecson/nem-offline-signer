import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { ToastProvider, LoadingProvider, WishlistProvider } from '../../providers/providers';
import { TranslateService } from '@ngx-translate/core';
import { AppGlobal } from '../../app/app.global';

@IonicPage()
@Component({
  selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage {
	AppGlobal: any;
	categories: any[] = new Array;
	data: any[] = new Array();
	app: any;
	scannedCode: any;

	constructor(
		public nav: NavController,
		statusBar: StatusBar,
		private translate: TranslateService,
		private toast: ToastProvider,
		public wishlist: WishlistProvider,
		public loader: LoadingProvider,
		public modalCtrl: ModalController,
		private barcodeScanner: BarcodeScanner,
		private alrtCtrl: AlertController
	) {
		// this.loader.present();
		// this.AppGlobal = AppGlobal;
	}

	scan() {
		this.barcodeScanner.scan().then(barcodeData => {
			this.scannedCode = JSON.parse(barcodeData.text).data;
			// console.log(this.scannedCode);
			this.nav.push("InvoicePage", {barcodeData: this.scannedCode})
		  }, (err) => {
			  console.log('Error: ', err);
			  return this.showAlert('Error', err.message);
		  });



	}

	manualEntry() {
		console.log('Manual Entry');
		this.nav.push("InvoicePage");
	}

	showAlert(title, message) {
		this.alrtCtrl.create({
		  title: title,
		  message: message,
		  buttons: ['Ok']
		}).present();
	  }
}
