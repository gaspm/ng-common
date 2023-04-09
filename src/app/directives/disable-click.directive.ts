import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appDisableClick]',
})
export class DisableClickDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.preventDefault();
  }
}
