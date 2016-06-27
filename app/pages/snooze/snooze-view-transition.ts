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
    let backdropAnimation = new Animation(backdrop);

    backdropAnimation.fromTo('opacity', '0.01', '0.8');

    this
      .element(enteringView.pageRef())
      .easing('ease')
      .duration(300)
      .before.addClass('show-page')
      .add(backdropAnimation)
  }
}
export class SnoozeSlideOutTransition extends Transition {
  constructor(enteringView: ViewController, leavingView: ViewController, opts: TransitionOptions) {
    super(enteringView, leavingView, opts);

    // DOM reads
    let ele = leavingView.pageRef().nativeElement;
    let backdrop = ele.querySelector('ion-backdrop');
    let backdropAnimation = new Animation(backdrop);

    backdropAnimation.fromTo('opacity', `${backdrop.style.opacity}`, '0.01');

    this.element(enteringView.pageRef()).easing('ease').duration(300)
      .add(backdropAnimation)
  }
}

Transition.register(TRANSITION_IN_KEY, SnoozeSlideInTransition);
Transition.register(TRANSITION_OUT_KEY, SnoozeSlideOutTransition);
