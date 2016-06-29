import {Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Animation, Item} from 'ionic-angular';
import {DragGestureRecognizerProvider} from '../../utils/gestures/drag-gesture-recognizer-provider';
import {GestureDirection} from '../../utils/gestures/gesture-direction';
import {ScrollDisabler} from '../../utils/scroll-disabler';

@Component({
  selector: `inbox-item-wrapper`,
  template: `
    <div class="item-wrapper" #itemWrapper>
      <ng-content></ng-content>
      <div class="left-cell" #leftCell>
        <div class="left-cell-inner">
          <div class="left-cell-content" *ngIf="areAccessoriesVisible()">
            <span class="left-cell-label">{{getLeftCellText()}}</span>
            <ion-icon [name]="getLeftIconName()" class="left-cell-icon"></ion-icon>
          </div>
        </div>
      </div>
      <div class="right-cell" #rightCell>
      <div class="right-cell-inner">
        <div class="right-cell-content" *ngIf="areAccessoriesVisible()">
          <span class="right-cell-label">{{getRightCellText()}}</span>
          <ion-icon [name]="getRightIconName()" class="right-cell-icon"></ion-icon>
        </div>
      </div>
      </div>
    </div>
  `
})
export class InboxItemWrapper{

  @Input() leftLabelTextShort: string;
  @Input() leftLabelTextLong: string;
  @Input() leftIconShort: string;
  @Input() leftIconLong: string;

  @Input() rightLabelTextShort: string;
  @Input() rightLabelTextLong: string;
  @Input() rightIconShort: string;
  @Input() rightIconLong: string;

  @Input() overrideLeftShortSwipeTransition: (elementRef: ElementRef, currentPosition: number, originalNewPosition: number, velocity: number, maxSwipeDuration: number, minSwipeDuration: number) => Animation;
  @Input() overrideLeftLongSwipeTransition: (elementRef: ElementRef, currentPosition: number, originalNewPosition: number, velocity: number, maxSwipeDuration: number, minSwipeDuration: number) => Animation;
  @Input() overrideRightShortSwipeTransition: (elementRef: ElementRef, currentPosition: number, originalNewPosition: number, velocity: number, maxSwipeDuration: number, minSwipeDuration: number) => Animation;
  @Input() overrideRightLongSwipeTransition: (elementRef: ElementRef, currentPosition: number, originalNewPosition: number, velocity: number, maxSwipeDuration: number, minSwipeDuration: number) => Animation;

  @Output() leftShortSwipe: EventEmitter<any> = new EventEmitter();
  @Output() leftLongSwipe: EventEmitter<any> = new EventEmitter();
  @Output() rightShortSwipe: EventEmitter<any> = new EventEmitter();
  @Output() rightLongSwipe: EventEmitter<any> = new EventEmitter();

  @ContentChild(Item, { read: ElementRef }) itemElementRef: ElementRef;
  @ViewChild("itemWrapper") wrapperEleRef: ElementRef;
  @ViewChild("leftCell") leftCellRef: ElementRef;
  @ViewChild("rightCell") rightCellRef: ElementRef;

  protected initialTouch: HammerPoint;
  protected previousTouch: HammerPoint;
  protected mostRecentTouch: HammerPoint;
  protected percentageDragged: number;

  protected leftToRight:boolean;

  constructor(protected dragGestureRecognizerProvider: DragGestureRecognizerProvider, protected elementRef: ElementRef, protected scrollDisabler: ScrollDisabler) {
  }

  getContainerWidth() {
    return (<HTMLElement> this.wrapperEleRef.nativeElement).getBoundingClientRect().width;
  }

  ngAfterViewInit() {
    let previousTimestamp = 0
    let currentTimestamp = 0;
    let dragGesture = this.dragGestureRecognizerProvider.getGestureRecognizer(this.wrapperEleRef, {threshold: 15, direction: GestureDirection.HORIZONTAL});
    dragGesture.listen();

    let onPanStartSubscription = dragGesture.onPanStart.subscribe((event:HammerInput) => {
      this.scrollDisabler.disableScroll();
      if ( event.direction === GestureDirection.LEFT ) {
        this.leftToRight = false;
      }
      else {
        this.leftToRight = true;
      }
      this.initialTouch = event.center;
    });

    let onPanMoveSubscription = dragGesture.onPanMove.subscribe((event:HammerInput) => {
      this.handleDrag(event);
    });

    let onPanEndSubscription = dragGesture.onPanEnd.subscribe((event:HammerInput) => {
      if ( this.percentageDragged < INCOMPLETE_DRAG_PERCENTAGE ) {
        this.resetDrag(event);
      }
      else if ( this.percentageDragged < SHORT_DRAG_PERCENTAGE ) {
        this.shortDrag(event);
      }
      else{
        this.longDrag(event);
      }
      this.initialTouch = null;
      this.previousTouch = null;
      this.mostRecentTouch = null;
      this.scrollDisabler.enableScroll();
    });
  }

  areAccessoriesVisible() {
    return !(this.percentageDragged < INCOMPLETE_DRAG_PERCENTAGE);
  }

  isShortDrag() {
    return this.percentageDragged < SHORT_DRAG_PERCENTAGE;
  }

  getLeftCellText() {
    if ( this.isShortDrag() ) {
      return this.leftLabelTextShort;
    }
    return this.leftLabelTextLong;
  }

  getRightCellText() {
    if ( this.isShortDrag() ) {
      return this.rightLabelTextShort;
    }
    return this.rightLabelTextLong;
  }

  getLeftIconName() {
    if ( this.isShortDrag() ) {
      return this.leftIconShort;
    }
    return this.leftIconLong;
  }

  getRightIconName() {
    if ( this.isShortDrag() ) {
      return this.rightIconShort;
    }
    return this.rightIconLong;
  }

  handleDrag(event:HammerInput) {
    // first out how far the item has moved from the initial touch
    this.previousTouch = this.mostRecentTouch || event.center;
    this.mostRecentTouch = event.center;
    let offset = event.center.x - this.initialTouch.x;
    this.percentageDragged = Math.abs(offset/this.getContainerWidth());
    if ( this.leftToRight ) {
      this.processLeftToRightDrag(event);
    } else{
      this.processRightToLeftDrag(event);
    }
  }

  resetDrag(event:HammerInput) {
    if ( this.leftToRight ) {
      let currentPosition = this.previousTouch.x - this.getContainerWidth();
      let newPosition = 0 - this.getContainerWidth();
      this.animateLeftCellOut(currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_RESET, MINIMUM_DURATION_RESET, () => {
        this.removeAnimationClasses(this.leftCellRef);
      });
    } else {
      let currentPosition = this.previousTouch.x;
      let newPosition = this.getContainerWidth();
      this.animateRightCellOut(currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_RESET, MINIMUM_DURATION_RESET, () => {
        this.removeAnimationClasses(this.rightCellRef);
      });
    }
  }

  shortDrag(event:HammerInput) {
    if ( this.leftToRight ) {
      let currentPosition = this.previousTouch.x - this.getContainerWidth();
      let newPosition = this.getContainerWidth() * 2;
      if ( this.overrideLeftShortSwipeTransition ) {
        let animation = this.overrideLeftShortSwipeTransition(this.leftCellRef, currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE);
        animation.onFinish(() => {
          this.leftShortSwipe.emit({});
          //this.removeAnimationClasses(this.leftCellRef);
        });
        animation.play();
      } else{
        this.animateLeftCellOut(currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE, () => {
          this.leftShortSwipe.emit({});
          this.removeAnimationClasses(this.leftCellRef);
        });
      }
    } else {
      let currentPosition = this.previousTouch.x;
      let newPosition = 0 - this.getContainerWidth();
      if ( this.overrideRightShortSwipeTransition ) {
        let animation = this.overrideRightShortSwipeTransition(this.rightCellRef, currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE);
        animation.onFinish(() => {
          console.log("Animation Done: ", Date.now());
          this.rightShortSwipe.emit({});
          //this.removeAnimationClasses(this.rightCellRef);
        });
        animation.play();
      } else{
        this.animateRightCellOut(currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE, () => {
          this.rightShortSwipe.emit({});
          this.removeAnimationClasses(this.rightCellRef);
        });
      }
    }
  }

  longDrag(event:HammerInput) {
    if ( this.leftToRight ) {
      let currentPosition = this.previousTouch.x - this.getContainerWidth();
      let newPosition = this.getContainerWidth() * 2;
      if ( this.overrideLeftLongSwipeTransition ) {
        let animation = this.overrideLeftLongSwipeTransition(this.leftCellRef, currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE);
        animation.onFinish(() => {
          this.leftLongSwipe.emit({});
          //this.removeAnimationClasses(this.leftCellRef);
        });
        animation.play();
      } else {
        this.animateLeftCellOut(currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE, () => {
          this.leftLongSwipe.emit({});
          this.removeAnimationClasses(this.leftCellRef);
        });
      }
    } else {
      let currentPosition = this.previousTouch.x;
      let newPosition = 0 - this.getContainerWidth();
      if ( this.overrideRightLongSwipeTransition ) {
        let animation = this.overrideRightLongSwipeTransition(this.rightCellRef, currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE);
        animation.onFinish(() => {
          this.rightLongSwipe.emit({});
          //this.removeAnimationClasses(this.rightCellRef);
        });
        animation.play();
      } else {
        this.animateRightCellOut(currentPosition, newPosition, event.velocityX, MAXIMUM_DURATION_SWIPE, MINIMUM_DURATION_SWIPE, () => {
          this.rightLongSwipe.emit({});
          this.removeAnimationClasses(this.rightCellRef);
        });
      }
    }
  }

  processLeftToRightDrag(event:HammerInput) {
    let currentPosition = this.previousTouch.x - this.getContainerWidth();
    let newPosition = this.mostRecentTouch.x - this.getContainerWidth();
    this.animateLeftCellIn(currentPosition, newPosition);
  }

  processRightToLeftDrag(event:HammerInput) {
    let currentPosition = this.previousTouch.x;
    let newPosition = this.mostRecentTouch.x;
    this.animateRightCellIn(currentPosition, newPosition);
  }

  animateLeftCellIn(currentPosition:number, newPosition:number) {
    let animation = new Animation(this.leftCellRef.nativeElement, {renderDelay: 0});
    animation.fromTo('translateX', `${currentPosition}px`, `${newPosition}px`);
    animation.before.addClass("active");
    if ( this.percentageDragged < INCOMPLETE_DRAG_PERCENTAGE ) {
      animation.before.addClass("disabled");
      animation.before.removeClass("short");
      animation.before.removeClass("long");
    }
    else if ( this.percentageDragged < SHORT_DRAG_PERCENTAGE) {
      animation.before.addClass("short");
      animation.before.removeClass("disabled");
      animation.before.removeClass("long");
    }
    else{
      animation.before.addClass("long");
      animation.before.removeClass("disabled");
      animation.before.removeClass("short");
    }
    animation.play();
  }

  animateLeftCellOut(currentPosition:number, endPosition:number, velocity:number, maximumDurationInMillis:number, minimumDurationInMillis:number, callback: Function) {
    let distance = Math.abs(endPosition - currentPosition);
    let transitionTimeInMillis = Math.abs(Math.floor(distance/velocity));
    console.log("Transition Time: ", transitionTimeInMillis);
    if ( transitionTimeInMillis > maximumDurationInMillis ) {
        transitionTimeInMillis = maximumDurationInMillis;
    }
    if ( transitionTimeInMillis < minimumDurationInMillis ) {
      transitionTimeInMillis = minimumDurationInMillis;
    }
    let animation = new Animation(this.leftCellRef.nativeElement, {renderDelay: 0});
    animation.fromTo('translateX', `${currentPosition}px`, `${endPosition}px`);
    animation.duration(transitionTimeInMillis);
    animation.easing("ease-in");
    if ( callback ) {
      animation.onFinish(callback);
    }
    animation.play();
  }

  animateRightCellIn(currentPosition:number, newPosition:number) {
    let animation = new Animation(this.rightCellRef.nativeElement, {renderDelay: 0});
    animation.fromTo('translateX', `${currentPosition}px`, `${newPosition}px`);
    animation.before.addClass("active");
    if ( this.percentageDragged < INCOMPLETE_DRAG_PERCENTAGE ) {
      animation.before.addClass("disabled");
      animation.before.removeClass("short");
      animation.before.removeClass("long");
    }
    else if ( this.percentageDragged < SHORT_DRAG_PERCENTAGE) {
      animation.before.addClass("short");
      animation.before.removeClass("disabled");
      animation.before.removeClass("long");
    }
    else{
      animation.before.addClass("long");
      animation.before.removeClass("disabled");
      animation.before.removeClass("short");
    }
    animation.play();
  }

  animateRightCellOut(currentPosition:number, endPosition:number, velocity:number, maximumDurationInMillis:number, minimumDurationInMillis:number, callback: Function) {
    let distance = Math.abs(endPosition - currentPosition);
    let transitionTimeInMillis = Math.abs(Math.floor(distance/velocity));
    if ( transitionTimeInMillis > maximumDurationInMillis ) {
        transitionTimeInMillis = maximumDurationInMillis;
    }
    if ( transitionTimeInMillis < minimumDurationInMillis ) {
      transitionTimeInMillis = minimumDurationInMillis;
    }
    let animation = new Animation(this.rightCellRef.nativeElement, {renderDelay: 0});
    animation.fromTo('translateX', `${currentPosition}px`, `${endPosition}px`);
    animation.duration(transitionTimeInMillis);
    animation.easing("ease-in");
    if ( callback ) {
      animation.onFinish(callback);
    }
    animation.play();
  }

  removeAnimationClasses(elementRef: ElementRef){
    (<HTMLElement> elementRef.nativeElement).classList.remove('disabled');
    (<HTMLElement> elementRef.nativeElement).classList.remove('long');
    (<HTMLElement> elementRef.nativeElement).classList.remove('short');
    (<HTMLElement> elementRef.nativeElement).classList.remove('active');
  }
}

const INCOMPLETE_DRAG_PERCENTAGE = .10;
const SHORT_DRAG_PERCENTAGE = .55;

const MAXIMUM_DURATION_RESET = 100;
const MINIMUM_DURATION_RESET = 50;

const MAXIMUM_DURATION_SWIPE = 300;
const MINIMUM_DURATION_SWIPE = 250;
