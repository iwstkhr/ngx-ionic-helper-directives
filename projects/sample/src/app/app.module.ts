import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxIonicHelperDirectivesModule } from 'ngx-ionic-helper-directives';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxIonicHelperDirectivesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
