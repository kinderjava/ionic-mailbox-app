import {Component, ElementRef, ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';

@Component({
  template: `
  <ion-content class="transparent">
    <ion-backdrop #backdrop></ion-backdrop>
    <div class="snooze-wrapper" #wrapper>
      <ion-grid >
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="alarm"></ion-icon>
            </button>
            <div class="snooze-label">
              Later Today
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="moon"></ion-icon>
            </button>
            <div class="snooze-label">
              This Evening
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="cafe"></ion-icon>
            </button>
            <div class="snooze-label">
              Tomorrow
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="sunny"></ion-icon>
            </button>
            <div class="snooze-label">
              This Weekend
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="briefcase"></ion-icon>
            </button>
            <div class="snooze-label">
              Next Week
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="calendar"></ion-icon>
            </button>
            <div class="snooze-label">
              In a Month
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn" (click)="snooze()">
              <ion-icon name="rainy"></ion-icon>
            </button>
            <div class="snooze-label">
              Someday
            </div>
          </ion-col>
          <ion-col width-33></ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn text-btn" (click)="snooze()">
              08
            </button>
            <div class="snooze-label">
              Pick Date
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-content>
  `
})
export class SnoozeView {

  @ViewChild('col', {read: ElementRef}) columnElement: ElementRef;

  constructor(private viewController: ViewController) {
  }

  snooze(){
    this.viewController.dismiss();
  }
}
