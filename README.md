# ngx-ionic-helper-directives

## Dependencies
* Angular 13
* Ionic 6

## Install
NOTE: Replace `x.x.x` with the version.

```
$ cd $YOUR_APP_PATH
$ curl -OL https://github.com/iwstkhr/ngx-ionic-helper-directives/raw/main/iwstkhr-ngx-ionic-helper-directives-x.x.x.tgz
$ npm add iwstkhr-ngx-ionic-helper-directives-x.x.x.tgz
```

## Setup
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxIonicHelperDirectivesModule } from 'ngx-ionic-helper-directives';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxIonicHelperDirectivesModule, // Added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Usage
```html
<div *ngxIonicIfPlatform="'desktop'">
  You can see this when running in desktop platform.
</div>

<div *ngxIonicIfNotPlatform="'mobile'">
  You can see this when running NOT in mobile platform.
</div>
```

## License
MIT
