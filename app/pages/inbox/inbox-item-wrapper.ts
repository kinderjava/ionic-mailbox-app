import {Component, ContentChild, ElementRef, ViewChild} from "@angular/core";
import {DragGestureRecognizerProvider} from "../../utils/gestures/drag-gesture-recognizer-provider";
import {GestureDirection} from "../../utils/gestures/gesture-direction";

import {Animation, Item} from "ionic-angular";

@Component({
  selector: `inbox-item-wrapper`,
  template: `
    <div class="item-wrapper" #itemWrapper>
      <ng-content></ng-content>
      <div class="left-cell" #leftCell></div>
      <div class="right-cell" #rightCell></div>
    </div>
  `
})
export class InboxItemWrapper{

  @ContentChild(Item, { read: ElementRef }) itemElementRef: ElementRef;
  @ViewChild("itemWrapper") wrapperEleRef: ElementRef;
  @ViewChild("leftCell") leftCellRef: ElementRef;
  @ViewChild("rightCell") rightCellRef: ElementRef;

  protected initialTouch: HammerPoint;
  protected previousTouch: HammerPoint;
  protected mostRecentTouch: HammerPoint;
  protected percentageDragged: number;
  protected leftToRight:boolean;

  protected INCOMPLETE_DRAG_PERCENTAGE: number = .25;
  protected SHORT_DRAG_PERCENTAGE: number = .50;


  constructor(protected dragGestureRecognizerProvider:DragGestureRecognizerProvider, protected elementRef:ElementRef){
  }

  getContainerWidth(){
    return (<HTMLElement> this.wrapperEleRef.nativeElement).getBoundingClientRect().width;
  }

  ngAfterViewInit(){
    let previousTimestamp = 0
    let currentTimestamp = 0;
    let dragGesture = this.dragGestureRecognizerProvider.getGestureRecognizer(this.wrapperEleRef, {threshold: 1, direction: GestureDirection.ALL});
    dragGesture.listen();
    let onPanStartSubscription = dragGesture.onPanStart.subscribe((event:HammerInput) => {
      this.initialTouch = event.center;
    });
    let onPanMoveSubscription = dragGesture.onPanMove.subscribe((event:HammerInput) => {
      this.handleDrag(event);
      previousTimestamp = currentTimestamp;
      currentTimestamp = Date.now();
      console.log(`Time between Moves: ${currentTimestamp - previousTimestamp}`);
    });
    let onPanEndSubscription = dragGesture.onPanEnd.subscribe((event:HammerInput) => {
      console.log("percentage dragged: ", this.percentageDragged);
      if ( this.percentageDragged < this.INCOMPLETE_DRAG_PERCENTAGE ){
        this.resetDrag(event);
      }
      else if ( this.percentageDragged < this.SHORT_DRAG_PERCENTAGE ){
        this.shortDrag(event);
      }
      else{
        this.longDrag(event);
      }
      this.initialTouch = null;
      this.previousTouch = null;
      this.mostRecentTouch = null;
    });
  }

  handleDrag(event:HammerInput){
    // first out how far the item has moved from the initial touch
    this.previousTouch = this.mostRecentTouch || event.center;
    this.mostRecentTouch = event.center;
    let offset = event.center.x - this.initialTouch.x;
    this.percentageDragged = offset/this.getContainerWidth();
    if ( offset > 0 ){
      // left to right
      this.leftToRight = true;
      this.processLeftToRightDrag(event);
    }
    else{
      // right to left
      this.leftToRight = false;
      this.processRightToLeftDrag(event);
    }
  }

  resetDrag(event:HammerInput){
    if ( this.leftToRight ){
      let currentPosition = this.previousTouch.x - this.getContainerWidth();
      let newPosition = 0 - this.getContainerWidth();
      this.animateLeftCellOut(currentPosition, newPosition, event.velocityX, 100, 50);
    }
    else{
    }
  }

  shortDrag(event:HammerInput){
    if ( this.leftToRight ){
      let currentPosition = this.previousTouch.x - this.getContainerWidth();
      let newPosition = this.getContainerWidth() * 2;
      this.animateLeftCellOut(currentPosition, newPosition, event.velocityX, 350, 200);
    }
    else{
    }
  }

  longDrag(event:HammerInput){
    if ( this.leftToRight ){
      let currentPosition = this.previousTouch.x - this.getContainerWidth();
      let newPosition = this.getContainerWidth() * 2;
      this.animateLeftCellOut(currentPosition, newPosition, event.velocityX, 350, 200);
    }
    else{
    }
  }

  processLeftToRightDrag(event:HammerInput){
    // all of our drags need to account for the offset of the container width
    let currentPosition = this.previousTouch.x - this.getContainerWidth();
    let newPosition = this.mostRecentTouch.x - this.getContainerWidth();
    this.animateLeftCellIn(currentPosition, newPosition);
  }

  processRightToLeftDrag(event:HammerInput){
  }

  animateLeftCellIn(currentPosition:number, newPosition:number){
    console.log(`Moving from ${currentPosition} to ${newPosition}`);
    let animation = new Animation(this.leftCellRef.nativeElement, {renderDelay: 0});
    animation.fromTo('translateX', `${currentPosition}px`, `${newPosition}px`);
    if ( this.percentageDragged < this.INCOMPLETE_DRAG_PERCENTAGE ){
      animation.before.addClass("disabled");
      animation.before.removeClass("short");
      animation.before.removeClass("long");
    }
    else if ( this.percentageDragged < this.SHORT_DRAG_PERCENTAGE){
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

  animateLeftCellOut(currentPosition:number, endPosition:number, velocity:number, maximumDurationInMillis:number, minimumDurationInMillis:number){
    let distance = Math.abs(endPosition - currentPosition);
    let transitionTimeInMillis = Math.abs(Math.floor(distance/velocity));
    console.log("Transition Time: ", transitionTimeInMillis);
    if ( transitionTimeInMillis > maximumDurationInMillis ){
        transitionTimeInMillis = maximumDurationInMillis;
    }
    if ( transitionTimeInMillis < minimumDurationInMillis ){
      transitionTimeInMillis = minimumDurationInMillis;
    }
    let animation = new Animation(this.leftCellRef.nativeElement, {renderDelay: 0});
    animation.fromTo('translateX', `${currentPosition}px`, `${endPosition}px`);
    animation.duration(transitionTimeInMillis);
    animation.easing("ease-in");
    animation.play();
  }
}
