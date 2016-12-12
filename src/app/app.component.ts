import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-users></app-users>'
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;

  constructor(viewContainerRef: ViewContainerRef) {
    // You need this hack in order to catch application root view container ref (for the modal dialog)
    this.viewContainerRef = viewContainerRef;
  }
}
