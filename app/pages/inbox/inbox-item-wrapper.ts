import {Component} from "@angular/core";

@Component({
  selector: `inbox-item-wrapper`,
  template: `
    <div class="item-wrapper">
      <ng-content></ng-content>
      <div class="left-cell"></div>
      <div class="right-cell"></div>
    </div>
  `
})
export class InboxItemWrapper{
  constructor(){
  }
}
