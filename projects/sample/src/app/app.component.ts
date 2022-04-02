import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ngxIonicIfPlatform="'desktop'">
      You can see this when running in desktop platform.
    </div>

    <div *ngxIonicIfNotPlatform="'mobile'">
      You can see this when running NOT in mobile platform.
    </div>
  `,
})
export class AppComponent {}
