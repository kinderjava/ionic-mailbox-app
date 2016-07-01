import {Injectable} from '@angular/core';
import {App, NavOptions, ViewController} from 'ionic-angular';
import {SnoozeView} from './snooze-view';

export class SnoozeViewViewController extends ViewController {

  public isAlreadyDismissed: boolean;

  constructor(private app: App, opts: any = {}) {
    super(SnoozeView, opts);
    this.isOverlay = true;

    this.fireOtherLifecycles = true;
  }

  getTransitionName(direction: string) {
    let key = 'snoozeView' + (direction === 'back' ? 'Leave' : 'Enter');
    return this._nav && this._nav.config.get(key);
  }

  static create(opts: any = {}) {
    return new SnoozeViewController(opts);
  }

  present(opts: NavOptions = {}){
    return this.app.present(this, opts);
  }
}

@Injectable()
export class SnoozeViewController {
  constructor(private app:App){
  }

  create(){
    return new SnoozeViewViewController(this.app);
  }
}
