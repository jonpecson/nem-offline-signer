import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account-help',
  templateUrl: 'help.html',
})
export class AccountHelpPage {
  faqs: any[] = [
    {id: 1, title: 'What is XEM?', answer: '\"XEM\" is NEM\'s currency code. It is similar to USD, EUR, CNY, JPY etc.'},
    {id: 2, title: 'Is NEM a cryptocurrency?', answer: 'NEM is not just a crypto currency. NEM is a blockchain project which caters to much more than only handling it\'s native currency tokens "XEM". Above that, and more importantly, NEM is a peer to peer platform and it provides services like payments, messaging, asset making, and naming system. There shall be a lot more to come as NEM is an evolving solution with an outstanding core blockchain technology.'},
    {id: 3, title: 'Where can I spend my XEMs?',
    answer: `
    <ul>
      <li><a href="http://mynem.store/">mynem.store</a>, sell NEM related products such as mugs, hats and accepts XEM as a payment.</li>
      <li><a href="https://www.zazzle.com.au/kurinoya">zazzle </a></li>
      <li><a href="http://www.nembid.xyz/">nembid</a> , similar to eBay that accepts XEM as a payment.</li>
      </ul>`},
    {id: 4, title: 'Where can I buy XEM?',
    answer: `You can buy or sell XEM at many third-party exchange websites.
    <br> <br>

    <ul>
        <li><a target="_blank" href="https://poloniex.com/">POLONIEX</a></li>
        <li><a target="_blank" href="http://www.btc38.com/trade_en.html">BTC38</a></li>
        <li><a target="_blank" href="https://www.bitcoin.co.id/">BITCOIN.co.id</a></li>
        <li><a target="_blank" href="https://changelly.com/">Changelly</a></li>
        <li><a target="_blank" href="https://alcurex.com/#BLC-BTC">Alcurex</a></li>
        <li><a target="_blank" href="https://bittrex.com/">BITTREX</a></li>
        <li><a target="_blank" href="https://zaif.jp/?lang=en">ZAIF</a></li>
        <li><a target="_blank" href="https://hitbtc.com/">HitBTC</a></li>
        <li><a target="_blank" href="https://www.litebit.eu/en">Litebit</a></li>
        <li><a target="_blank" href="https://bter.com/">Bter</a></li>
    </ul>

    `}

  ];

  constructor() {

  }

  toggleSection(i) {
    this.faqs[i].open = !this.faqs[i].open;
  }

  toggleItem(i, j) {
    this.faqs[i].child[j].open = !this.faqs[i].child[j].open;
  }

}
