import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  template: `
  <ion-content class="transparent">
    <ion-backdrop #backdrop></ion-backdrop>
    <div class="wrapper" #wrapper>
      <ion-grid >
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn">
              <ion-icon name="alarm"></ion-icon>
            </button>
            <div class="snooze-label">
              Later Today
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn">
              <ion-icon name="moon"></ion-icon>
            </button>
            <div class="snooze-label">
              This Evening
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn">
              <ion-icon name="cafe"></ion-icon>
            </button>
            <div class="snooze-label">
              Tomorrow
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn">
              <ion-icon name="sunny"></ion-icon>
            </button>
            <div class="snooze-label">
              This Weekend
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn">
              <ion-icon name="briefcase"></ion-icon>
            </button>
            <div class="snooze-label">
              Next Week
            </div>
          </ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn">
              <ion-icon name="calendar"></ion-icon>
            </button>
            <div class="snooze-label">
              In a Month
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col width-33 class="snooze-col" text-center #col>
            <button round light outline class="snooze-btn">
              <ion-icon name="rainy"></ion-icon>
            </button>
            <div class="snooze-label">
              Someday
            </div>
          </ion-col>
          <ion-col width-33></ion-col>
          <ion-col width-33 class="snooze-col" text-center>
            <button round light outline class="snooze-btn text-btn">
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

  constructor() {
  }

  getElementHeight(){
    return this.columnElement.nativeElement.clientWidth + 'px';
  }
}
