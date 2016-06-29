import {Component, ElementRef, ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  template: `
  <ion-content class="transparent">
    <ion-backdrop #backdrop></ion-backdrop>
    <div class="snooze-wrapper" #wrapper>
      <ion-grid>
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn" (click)="snooze('Later Today')">
              <ion-icon name="alarm"></ion-icon>
            </button>
            <div class="snooze-label">
              Later Today
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze('This Evening')">
              <ion-icon name="moon"></ion-icon>
            </button>
            <div class="snooze-label">
              This Evening
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze('Tomorrow')">
              <ion-icon name="cafe"></ion-icon>
            </button>
            <div class="snooze-label">
              Tomorrow
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn" (click)="snooze('This Weekend')">
              <ion-icon name="sunny"></ion-icon>
            </button>
            <div class="snooze-label">
              This Weekend
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze('Next Week')">
              <ion-icon name="briefcase"></ion-icon>
            </button>
            <div class="snooze-label">
              Next Week
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze('In a Month')">
              <ion-icon name="calendar"></ion-icon>
            </button>
            <div class="snooze-label">
              In a Month
            </div>
          </ion-col>
        </ion-row>
        <!--<ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn" (click)="snooze('Someday')">
              <ion-icon name="rainy"></ion-icon>
            </button>
            <div class="snooze-label">
              Someday
            </div>
          </ion-col>
          <ion-col width-33></ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn text-btn" (click)="snooze('Pick a Date')">
              08
            </button>
            <div class="snooze-label">
              Pick a Date
            </div>
          </ion-col>
        </ion-row>-->
      </ion-grid>
    </div>
  </ion-content>
  `
})
export class SnoozeView {

  @ViewChild('col', {read: ElementRef}) columnElement: ElementRef;

  constructor(private viewController: ViewController) {
  }

  snooze(value:string){
    let remindMeInMillis = this.getSnoozeTime(value);
    this.viewController.dismiss({ snoozedUntilDate: new Date(remindMeInMillis)});
  }

  getSnoozeTime(value:string){
    if ( value === 'Later Today' ) {
      return Date.now() + 3 * MILLIS_PER_HOUR;
    } else if ( value === 'This Evening' ) {
      // go to the next 7pm
      let date = new Date();
      if ( date.getHours() > 18) {
        // if it's past 7 pm, go to the next day
        date.setTime(Date.now() + MILLIS_PER_HOUR * 24);
      }
      date.setHours(18);
      date.setMinutes(0);
      return date.getTime();
    } else if ( value === 'Tomorrow' ) {
      // add a day to current time
      return Date.now() + MILLIS_PER_HOUR * 24;
    } else if ( value === 'This Weekend' ) {
      // go to the next saturday
      let date = new Date();
      let daysUntilSaturday = 6 - date.getDay();
      daysUntilSaturday = daysUntilSaturday > 0 ? daysUntilSaturday : 7;
      return Date.now() + daysUntilSaturday * 24 * MILLIS_PER_HOUR;
    } else if ( value === 'Next Week' ) {
      // add 7 days on to current time
      return Date.now() + 7 * 24 * MILLIS_PER_HOUR;
    } else if ( value === 'In a Month' ) {
      // increment one month from now
      let date = new Date();
      let month = date.getMonth();
      month = (month + 1) % 11;
      date.setMonth(month);
      return date.getTime();
    } else if ( value === 'Someday' ) {
      // increment 3 months from now
      let date = new Date();
      let month = date.getMonth();
      month = (month + 3) % 11;
      date.setMonth(month);
      return date.getTime();
    }
    else {
      // just return -1 for now
      return -1;
    }
  }
}

const MILLIS_PER_HOUR = 1000 * 60 * 60;
