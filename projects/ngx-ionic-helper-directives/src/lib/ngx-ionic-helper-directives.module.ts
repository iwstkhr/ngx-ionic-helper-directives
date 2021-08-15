import { NgModule } from '@angular/core';
import { IfPlatformDirective } from './if-platform.directive';
import { IfNotPlatformDirective } from './if-not-platform.directive';

const directives = [IfPlatformDirective, IfNotPlatformDirective];

@NgModule({
  declarations: directives,
  imports: [],
  exports: directives,
})
export class NgxIonicHelperDirectivesModule {}
