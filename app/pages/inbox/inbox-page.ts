import {Component, ContentChildren, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {App, Alert, Animation, NavController} from 'ionic-angular';

import {EmailDataProvider, Email} from "./email-data-provider";

import {ArchivedInbox} from './archived-inbox';
import {UnreadInbox} from './unread-inbox';

@Component({
  directives: [ArchivedInbox, UnreadInbox],
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
      <ion-buttons end>
        <button>
            <ion-icon ios="ios-create-outline" md="ios-create-outline"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  </ion-header>
  <ion-content [ngSwitch]="activeSegment">
    <div *ngSwitchCase="'snoozed'">Snoozed</div>
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
