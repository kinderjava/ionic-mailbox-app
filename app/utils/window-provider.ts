import {Injectable} from '@angular/core';

export class WindowProvider {
  constructor() {
  }

  getWindow() {
    return window;
  }
}
