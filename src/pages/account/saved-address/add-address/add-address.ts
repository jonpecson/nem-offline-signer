import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { SettingsProvider, LoadingProvider, ToastProvider, UserProvider, AddressProvider } from '../../../../providers/providers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {
  private form : FormGroup;

  data: any;
  countries: any[] = [];
  states: any[] = [];
  countryOpts: any;
  stateOpts: any;

  constructor(private setting: SettingsProvider, public viewCtrl: ViewController, private loader: LoadingProvider, private toast: ToastProvider, private translate: TranslateService, private user: UserProvider,  private navParams: NavParams, private address: AddressProvider, private fb: FormBuilder) {

  this.translate.get(['SELECT', 'COUNTRY', 'SELECT_YOUR_COUNTRY', 'STATE', 'SELECT_YOUR_STATE']).subscribe( x=> {
    this.countryOpts = {
      title: x.SELECT + ' ' + x.COUNTRY,
      subTitle: x.SELECT_YOUR_COUNTRY
    }

    this.stateOpts = {
      title: x.SELECT + ' ' + x.STATE,
      subTitle: x.SELECT_YOUR_STATE
    }
  });

  this.data = navParams.data.params;
  this.loadCountry();

  this.form = this.fb.group({
      first_name: [this.data.first_name || (this.user.all ? this.user.firstname : ''), Validators.required ],
      last_name: this.data.last_name || (this.user.all ? this.user.lastname : ''),
      email: [this.user.all ? this.user.email : '', Validators.required],
      phone: [this.data.phone, Validators.required ],
      city: [this.data.city, Validators.required ],
      state: [this.data.state, Validators.required ],
      postcode: [this.data.postcode, Validators.required ],
      address_1: [this.data.address_1, Validators.required ],
      country: [this.data.country, Validators.required ]
    });
  }

  loadCountry(){
    if(this.setting.all.countries){
      this.countries = this.setting.getCountries();
    }else{
      this.loader.present();

    }

    if(this.data.action == 2)
      this.getStates();
  }

  getStates(){
    let id = this.data.country || this.form.value.country;

  }

  submit(){
    if(this.address.all.length == 0)
      this.form.value.primary = true;

    if(this.data.primary)
      this.form.value.primary = this.data.primary;

    if(this.data.action == 1) {
      this.address.add(this.form.value); // FOR NEW ADDRESS
      this.translate.get('NEW_ADDRESS_ADDED').subscribe( x=> {
        this.toast.show(x);
      });
    }

    if(this.data.action == 2) {
      this.address.update(this.navParams.data.index, this.form.value); // UPDATE ADDRESS
      this.translate.get('ADDRESS_WAS_UPDATED').subscribe( x=> {
        this.toast.show(x);
      });
    }

    if(this.data.action == 3){ // FOR CHECKOUT BILLING
      this.address.add(this.form.value);
    }

    if(this.data.action == 4){ // FOR CHECKOUT SHIPPING
      this.address.add(this.form.value);
    }

    this.dismiss();
  }

  dismiss() {
		this.viewCtrl.dismiss();
	}

}
