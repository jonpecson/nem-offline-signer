
import { SharedModule } from './shared.module';

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MODULES, PROVIDERS } from './app.imports';
import { LoaderPage } from "../pages/loader/loader";
import { ModalContentPage } from './../pages/invoice/modal';
import { QRCodeModule } from 'angular2-qrcode';



@NgModule({
  declarations: [
    MyApp,
    LoaderPage,
    ModalContentPage
  ],
  imports: [
    MODULES,
    SharedModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: ''
    }),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoaderPage,
    ModalContentPage
  ],
  providers: [
    PROVIDERS,
    // Keep this to enable Ionic's runtime error handling during development
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {

}
