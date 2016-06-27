import {ElementRef} from '@angular/core';
import {Animation, Transition, TransitionOptions, ViewController} from 'ionic-angular';

export const TRANSITION_IN_KEY: string = 'snoozeViewEnter';
export const TRANSITION_OUT_KEY: string = 'snoozeViewLeave';

export class SnoozeSlideInTransition extends Transition {
  constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions) {
    super(enteringView, leavingView, opts);

    // DOM READS
    let ele = <HTMLElement> enteringView.pageRef().nativeElement;
    let backdrop = ele.querySelector('ion-backdrop');
    let wrapper = ele.querySelector('.snooze-wrapper');
    let backdropAnimation = new Animation(backdrop);
    let wrapperAnimation = new Animation(wrapper);

    backdropAnimation.fromTo('opacity', '0.01', '0.8');
    wrapperAnimation.fromTo('translateX', `-100%`, `0%`);

    this
      .element(enteringView.pageRef())
      .easing('ease')
      .duration(300)
      .before.addClass('show-page')
      .add(backdropAnimation)
      .add(wrapperAnimation);
  }
}
export class SnoozeSlideOutTransition extends Transition {
  constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions) {
    super(enteringView, leavingView, opts);

    // DOM reads
    let ele = leavingView.pageRef().nativeElement;
    let backdrop = ele.querySelector('ion-backdrop');
    let wrapper = ele.querySelector('.snooze-wrapper');
    let backdropAnimation = new Animation(backdrop);
    let wrapperAnimation = new Animation(wrapper);

    backdropAnimation.fromTo('opacity', `${backdrop.style.opacity}`, '0.01');
    wrapperAnimation.fromTo('translateX', `0%`, `-100%`);

    this.element(leavingView.pageRef())
      .easing('ease')
      .duration(300)
      .add(backdropAnimation)
      .add(wrapperAnimation);
  }
}

Transition.register(TRANSITION_IN_KEY, SnoozeSlideInTransition);
Transition.register(TRANSITION_OUT_KEY, SnoozeSlideOutTransition);
