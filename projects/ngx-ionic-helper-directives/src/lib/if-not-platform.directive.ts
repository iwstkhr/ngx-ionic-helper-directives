import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';

type PlatformName =
  'ipad'|'iphone'|'ios'|'android'|'phablet'|'tablet'|'cordova'|
  'capacitor'|'electron'|'pwa'|'mobile'|'mobileweb'|'desktop'|'hybrid';

/**
 * Angular directive which render a template when running not in a specified platform
 *
 * @example
 * ```html
 * <div *ngxIonicIfNotPlatform='desktop'></div>
 * ```
 */
@Directive({
  selector: '[ngxIonicIfNotPlatform]'
})
export class IfNotPlatformDirective {

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private platform: Platform,
  ) {}

  @Input() set ngxIonicIfNotPlatform(name: PlatformName) {
    const isPlatform = this.platform.is(name);

    if (!isPlatform && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (isPlatform && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
