import {Injectable} from '@angular/core';
import {WindowProvider} from './window-provider';

export class ScrollDisabler{

  //private window: Window;

  constructor(/*windowProvider:WindowProvider*/){
    //this.window = windowProvider.getWindow();
    //this.window = window
  }

  disableScroll(){
    window.document.body.classList.add(DISABLE_SCROLL);
  }

  enableScroll(){
    window.document.body.classList.remove(DISABLE_SCROLL);
  }
}

const DISABLE_SCROLL = 'disable-scroll';
