import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SettingsProvider } from '../../providers/providers';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  app: any = {};

  constructor(public setting: SettingsProvider) {
    this.setting.load().then( x=>{
      if(x) this.app = x.settings;
    })
  }

  ionViewDidLoad(){

  }

  transform(value, app) {
    let x = app || this.setting.all.settings;
    return new CurrencyPipe('USD').transform(value, 'USD', true, '1.'+2+'-'+2);
  }
}
