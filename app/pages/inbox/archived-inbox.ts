import {Component, ContentChildren, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {App, Alert, Animation, NavController} from 'ionic-angular';

import {EmailDataProvider, Email} from "./email-data-provider";

@Component({
  selector: 'archived-inbox',
  template: `
  <ion-list>
    <button ion-item detail-none *ngFor="let email of emails" (click)="favorite(email)">
      <ion-icon ios="ios-star-outline" md="ios-star-outline" item-left *ngIf="!email.favorited" primary></ion-icon>
      <ion-icon class="yellow" ios="ios-star" md="ios-star" item-left *ngIf="email.favorited"></ion-icon>
      <p>{{email.sender}}</p>
      <h2>{{email.subject}}</h2>
      <p>{{email.body}}</p>
    </button>
  </ion-list>
  `
})
export class ArchivedInbox{

  emails: Email[];

  constructor(private app: App, private emailDataProvider:EmailDataProvider, private nav: NavController){
    this.loadArchivedEmails();
  }

  loadArchivedEmails(){
    this.emails = this.emailDataProvider.getArchivedEmails();
    console.log("emails: ", this.emails);
  }

  favorite(email:Email){
    email.favorited = !email.favorited;
  }
}
