import {Component, ElementRef, ViewChild} from "@angular/core";

import {EmailDataProvider} from "./email-data-provider";
import {InboxItemWrapper} from "./inbox-item-wrapper";

@Component({
  directives: [InboxItemWrapper],
  template:`
  <ion-navbar *navbar>
    <ion-segment primary padding>
      <ion-segment-button value="snoozed">
        <ion-icon name="time"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="inbox">
        <ion-icon name="mail"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="archived">
        <ion-icon name="checkmark-circle"></ion-icon>
      </ion-segment-button>
    </ion-segment>
    <ion-buttons start>
      <button>
          <ion-icon name="menu"></ion-icon>
      </button>
    </ion-buttons>
    <ion-buttons end>
      <button>
          <ion-icon ios="ios-create-outline" md="ios-create-outline"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
  <ion-content>
    <ion-list #list>
      <inbox-item-wrapper *ngFor="let email of emails; let i = index" (click)="favorite(email)">
        <button ion-item detail-none>
          <ion-icon ios="ios-star-outline" md="ios-star-outline" item-left *ngIf="!email.favorited"></ion-icon>
          <ion-icon class="yellow" ios="ios-star" md="ios-star" item-left *ngIf="email.favorited"></ion-icon>
          <p>{{email.sender}}</p>
          <h2>{{email.subject}}</h2>
          <p>{{email.body}}</p>
        </button>
      </inbox-item-wrapper>
    </ion-list>
  </ion-content>
  `
})
export class InboxPage{

  private selectedIndex:number = -1;
  emails: any[];

  constructor(protected emailDataProvider:EmailDataProvider){
  }

  ionViewWillEnter(){
    if ( ! this.emails ){
        this.emails = this.emailDataProvider.getEmails();
    }
  }

  ionViewDidEnter(){
  }

  favorite(email:any){
    email.favorited = !email.favorited;
  }
}
