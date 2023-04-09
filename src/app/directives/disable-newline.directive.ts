import {Directive, HostListener} from '@angular/core';

/**
 * Disable new line directive
 * Blocks a new line for confirmation with enter key (textarea)
 *
 * @example
 * // <textarea appDisableNewLine></textarea>
 */
@Directive({
  selector: '[appDisableNewLine]',
})
export class DisableNewlineDirective {
  @HostListener('keypress', ['$event'])
  @HostListener('keyup', ['$event'])
  public onEvent(event: Event | any): any {
    if (event?.keyCode === 13) {
      if (!event?.shiftKey) {
        event.preventDefault();
      }
    }
  }
}
