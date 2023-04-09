import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * RxJS operator that wraps the takeUntil operator while automatically assuming that on
 * objects that it receives as a parameter exists Observable destroyed$
 * It is intended to log out of an Observable that is used within a component
 * Designed to be used together with the ondestroy decorator
 */
export function untilDestroyed(object: any) {
  return function <T>(source: Observable<T>) {
    // I expect that "object" has "destroyed$" on the observable from which the event comes
    // so I stop processing other events
    return source.pipe(takeUntil(object.destroyed$));
  };
}
