import { ToastProvider } from './../../providers/toast/toast';
import { Component } from "@angular/core";
import { Platform, NavParams, ViewController, NavController, ToastController } from 'ionic-angular';

@Component({
    templateUrl: 'modal.html'
})

export class ModalContentPage{

    qrdata: any;
    data: any;

    constructor(private navCtrl: NavController, private platform: Platform,private params: NavParams,private viewCtrl: ViewController){
        this.qrdata = this.params.get('qrData');
    }

    dismiss(){
        this.viewCtrl.dismiss().then(()=> {
            this.navCtrl.push('TabsPage');
        });
    }
}