import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DisableClickDirective} from './directives/disable-click.directive';
import {DisableNewlineDirective} from './directives/disable-newline.directive';
import {InitialsPipe} from './pipes/initials.pipe';

const directives = [DisableClickDirective, DisableNewlineDirective];
const pipes = [InitialsPipe];

@NgModule({
  declarations: [AppComponent, directives, pipes],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
