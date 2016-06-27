import {Component, ContentChildren, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {App, Alert, Animation, NavController} from 'ionic-angular';

import {EmailDataProvider, Email} from "./email-data-provider";

import {ArchivedInbox} from './archived-inbox';
import {SnoozedInbox} from './snoozed-inbox';
import {UnreadInbox} from './unread-inbox';

@Component({
  directives: [ArchivedInbox, SnoozedInbox, UnreadInbox],
  template:`
  <ion-header>
    <ion-navbar no-border-bottom>
      <ion-segment primary padding [(ngModel)]="activeSegment">
        <ion-segment-button value="snoozed" class="small-seg-btn">
          <ion-icon name="time"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="inbox" class="small-seg-btn">
          <ion-icon name="mail"></ion-icon>
        </ion-segment-button>
        <ion-segment-button value="archived" class="small-seg-btn">
          <ion-icon name="checkmark-circle"></ion-icon>
        </ion-segment-button>
      </ion-segment>
    </ion-navbar>
  </ion-header>
  <ion-content [ngSwitch]="activeSegment">
    <snoozed-inbox *ngSwitchCase="'snoozed'">Snoozed</snoozed-inbox>
    <unread-inbox *ngSwitchCase="'inbox'"></unread-inbox>
    <archived-inbox *ngSwitchCase="'archived'"></archived-inbox>
  </ion-content>
  `
})
export class InboxPage{

  private activeSegment: string;

  constructor(){
      this.activeSegment = 'inbox';
  }
}
