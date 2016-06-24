import {Component, ContentChildren, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {App, Alert, Animation, NavController} from 'ionic-angular';

import {EmailDataProvider, Email} from "./email-data-provider";
import {InboxItemWrapper} from "./inbox-item-wrapper";

@Component({
  selector: 'unread-inbox',
  directives: [InboxItemWrapper],
  template: `
  <ion-list>
    <inbox-item-wrapper #instance *ngFor="let email of emails; let i = index"
      (click)="favorite(email)"
      leftIconShort="checkmark"
      leftIconLong="close"
      rightIconShort="time"
      rightIconLong="menu"
      (leftShortSwipe)="archive(i)"
      (leftLongSwipe)="delete(i)"
      (rightShortSwipe)="snooze(i)"
      (rightLongSwipe)="somethingElse(i)"
    >
      <button ion-item detail-none>
        <ion-icon ios="ios-star-outline" md="ios-star-outline" item-left *ngIf="!email.favorited" primary></ion-icon>
        <ion-icon class="yellow" ios="ios-star" md="ios-star" item-left *ngIf="email.favorited"></ion-icon>
        <p>{{email.sender}}</p>
        <h2>{{email.subject}}</h2>
        <p>{{email.body}}</p>
      </button>
    </inbox-item-wrapper>
  </ion-list>
  `
})
export class UnreadInbox{

  @ViewChildren('instance', {read: ElementRef}) itemWrappers: QueryList<ElementRef>;

  emails: Email[];

  constructor(private app: App, private emailDataProvider:EmailDataProvider, private nav: NavController){
    this.loadUnreadEmails();
  }

  loadUnreadEmails(){
    this.emails = this.emailDataProvider.getUnreadEmails();
    console.log(this.emails);
  }

  favorite(email:any){
    email.favorited = !email.favorited;
  }

  archive(index: number){
    this.emailDataProvider.archiveEmail(this.emails[index]);
    this.loadUnreadEmails();
  }

  delete(index: number){
    this.emailDataProvider.deleteEmail(this.emails[index]);
    this.loadUnreadEmails();
  }

  snooze(index: number){
    console.log("snooze received!");
  }

  somethingElse(index: number){
    let alert = Alert.create({
      title: 'Some Action',
      subTitle: `w00t! You've taken an action!`,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

}
