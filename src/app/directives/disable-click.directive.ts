import {Directive, HostListener} from '@angular/core';

/**
 * Disable click directive
 * Do prevent default on click event
 *
 * @example
 * // <a href="#" appDisableClick>Disabled Anchor</a>
 */
@Directive({
  selector: '[appDisableClick]',
})
export class DisableClickDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.preventDefault();
  }
}
