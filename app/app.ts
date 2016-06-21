import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {InboxPage} from './pages/inbox/inbox-page';
import {getProviders} from "./AppFactory";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: getProviders(),
})
export class MyApp {
  rootPage: any = InboxPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, null, {
  prodMode: true
})
