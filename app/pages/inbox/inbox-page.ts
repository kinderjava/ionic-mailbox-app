import {Component, ContentChildren, ElementRef, QueryList, ViewChildren} from "@angular/core";
import {App, Alert, Animation, NavController} from 'ionic-angular';

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
  </ion-content>
  `
})
export class InboxPage{

  @ViewChildren('instance', {read: ElementRef}) itemWrappers: QueryList<ElementRef>;

  private selectedIndex:number = -1;

  emails: any[];

  constructor(private app: App, emailDataProvider:EmailDataProvider, private nav: NavController){
    this.emails = emailDataProvider.getEmails();
  }

  favorite(email:any){
    email.favorited = !email.favorited;
  }

  archive(index: number){
    console.log("archive received!");
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit fired");
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter fired");
  }

  delete(index: number){
    let wrapperElements = this.itemWrappers.toArray();
    if ( index >= 0 && index < wrapperElements.length ){
      this.app.setEnabled(false);
      // set up parent animation
      let animation = new Animation(wrapperElements[index]);
      animation.fromTo('scaleY', '1.0', '0.0');
      animation.fromTo('opacity', '1.0', '0.1');
      // grab all of the other elements, and animate them up
      for ( let i = index + 1; i < wrapperElements.length; i++ ){
        let childAnimation = new Animation(wrapperElements[i]);
        childAnimation.fromTo('translateY', '0px', `-${wrapperElements[i].nativeElement.clientHeight}px`);
        animation.add(childAnimation);
      }

      animation.easing('ease-in');
      animation.duration(100);
      animation.onFinish( () => {
        setTimeout( () => {
          this.resetAnimationAndRemoveItem(index);
        }, 1);
      });
      animation.play();

      animation.play();
    }
  }

  resetAnimationAndRemoveItem(index:number){
    // we need to undo the translations we just did, then remove the item from the list
    let wrapperElements = this.itemWrappers.toArray();
    if ( index >= 0 && index < wrapperElements.length ){
      let animation = new Animation();
      for ( let i = index + 1; i < wrapperElements.length; i++ ){
        let childAnimation = new Animation(wrapperElements[i]);
        childAnimation.fromTo('translateY', `-${wrapperElements[i].nativeElement.clientHeight}px`, '0px');
        animation.add(childAnimation);
      }
      animation.onFinish(() => {
          this.app.setEnabled(true);
          this.emails.splice(index, 1);
      });
      animation.play();

    }
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
