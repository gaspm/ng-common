import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DisableClickDirective} from './directives/disable-click.directive';

const directives = [DisableClickDirective];

@NgModule({
  declarations: [AppComponent, directives],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
