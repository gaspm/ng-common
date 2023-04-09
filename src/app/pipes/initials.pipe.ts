import {Pipe, PipeTransform} from '@angular/core';

/**
 * Converts a string to initials
 */
@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(name: string): string {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('');
    return initials;
  }
}
